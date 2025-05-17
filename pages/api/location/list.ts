import type { NextApiRequest, NextApiResponse } from 'next'
import {
  OptsWithAuth,
  getUser,
  ProfileWithWallet,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { formatQuery, prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import { getPageParams } from '@/utils/api/backend'
import {
  LocationFragment,
  LocationListParams,
  LocationListParamsType,
  LocationListResponse,
  LocationMediaCategory,
  LocationQueryInclude,
  LocationType,
  LocationWithRelations,
} from '@/utils/types/location'
import { CitizenshipStatus } from '@/utils/types/profile'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationListResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = LocationListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  if ((params.lat === undefined) !== (params.lng === undefined)) {
    res
      .status(400)
      .send({ error: 'One of lat/lng is provided but the other is missing' })
    return
  }

  const user = await getUser(opts.auth)

  const idsInOrder = await sortPrequery(user, params)

  const query: Prisma.LocationFindManyArgs = {
    where: {
      id: { in: idsInOrder },
    },
    include: LocationQueryInclude({
      countActiveEventsOnly: params.countActiveEventsOnly === 'true',
    }),
  }

  const locations = await prisma.location.findMany(query)

  const sortedLocations = locations.sort((a, b) => {
    return idsInOrder.indexOf(a.id) - idsInOrder.indexOf(b.id)
  })

  res.status(200).send({
    locations: sortedLocations.map((location) =>
      locationToFragment(location as LocationWithRelations)
    ),
    count: locations.length,
  })
}

// get ids for locations sorted in proper order
const sortPrequery = async (
  user: ProfileWithWallet | null,
  params: LocationListParamsType
) => {
  const { skip, take } = getPageParams(params)
  const calculateDistance = params.lat && params.lng
  const distanceQuery = calculateDistance
    ? Prisma.sql`COALESCE(6371 * 2 * ASIN(SQRT(
      POWER(SIN((radians(a.lat) - radians(${params.lat})) / 2), 2) +
      COS(radians(${params.lat})) * COS(radians(a.lat)) *
      POWER(SIN((radians(a.lng) - radians(${params.lng})) / 2), 2)
    )), 999999)`
    : Prisma.sql`999999`

  const bounds = params.latLngBounds
    ? params.latLngBounds.split(',').map((s) => parseFloat(s))
    : []

  // NOTE: if we ever drop maxDist, we can drop the WITH clause and merge back down to a single SELECT

  // NOTE: there can be multiple stewards per location, which may lead to multiple rows for
  // the same location. this is ok because we're only getting ids and then querying for
  // locations later, but its still a gotcha if things change in the future

  const sqlQuery = Prisma.sql`
    WITH with_distance AS (
      SELECT 
        l.id as "id", l.type as "type", l.name as "name", l."createdAt" as "createdAt",
        l."publishedAt" as "publishedAt",
        MAX(o."endDate") as "endDate", steward."privyDID" as "privyDID",
        ${distanceQuery} AS "distanceInKM"
      FROM "Location" l
      LEFT JOIN "Address" a ON l.id = a."locationId"
      LEFT JOIN "Offer" o ON l.id = o."locationId"
      LEFT JOIN "LocationSteward" sl ON l.id = sl."locationId"
      LEFT JOIN "Profile" steward ON sl."profileId" = steward.id
      WHERE (
        ${
          params.searchQuery
            ? Prisma.sql`(l.name ILIKE ${`%${params.searchQuery}%`} OR a."formattedAddress" ILIKE ${`%${params.searchQuery}%`})`
            : Prisma.sql`1=1`
        })
        AND (
        ${
          params.stewardExternId
            ? Prisma.sql`steward."externId" = ${params.stewardExternId}`
            : Prisma.sql`1=1`
        })
        AND (
        ${
          params.locationType
            ? Prisma.sql`l.type = ${params.locationType}::"LocationType"`
            : Prisma.sql`1=1`
        })
        AND (
        ${
          bounds.length === 4
            ? Prisma.sql`a.lat <= ${bounds[0]} AND a.lat >= ${bounds[1]} AND a.lng <= ${bounds[2]} AND a.lng >= ${bounds[3]}`
            : Prisma.sql`1=1`
        })
        AND (
        ${
          user?.isAdmin
            ? Prisma.sql`1=1`
            : Prisma.sql`l."publishedAt" IS NOT NULL ${
                user
                  ? Prisma.sql`OR steward."privyDID" = ${user.privyDID}`
                  : Prisma.sql``
              }`
        })
      GROUP BY 
        l.id, steward."privyDID", a.lat, a.lng
    )
    SELECT id
    FROM with_distance
    GROUP BY 
      id, "distanceInKM", "privyDID", type, name, "createdAt", "publishedAt", "endDate"
    HAVING
      ${
        params.maxDist
          ? Prisma.sql`"distanceInKM" <= ${params.maxDist}`
          : Prisma.sql`1=1`
      }
    ORDER BY 
      "distanceInKM" ASC, 
      ${
        user
          ? Prisma.sql`"privyDID" = ${user.privyDID} AND "publishedAt" IS NULL DESC, "privyDID" = ${user.privyDID} DESC,`
          : Prisma.sql``
      }
      "publishedAt" IS NULL ASC,
      type = ${LocationType.Neighborhood}::"LocationType" DESC, 
      COALESCE(SUM(CASE WHEN "endDate" >= CURRENT_DATE THEN 1 ELSE 0 END), 0) DESC, 
      name ASC, 
      "createdAt" ASC
    LIMIT ${take}
    OFFSET ${skip}
  `

  let ids: { id: number }[] = []

  // console.log(formatQuery(sqlQuery.inspect().sql, sqlQuery.inspect().values))
  try {
    ids = await prisma.$queryRaw<{ id: number }[]>(sqlQuery)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to sort locations', {
        profileId: user?.id,
        query: formatQuery(sqlQuery.inspect().sql, sqlQuery.inspect().values),
        errorStack: error.stack,
        params,
        take,
        skip,
      })
    }
    return []
  }

  return ids.reduce((ids: number[], row) => [...ids, row.id], [])
}

export const locationToFragment = (
  loc: LocationWithRelations
): LocationFragment => {
  return {
    createdAt: loc.createdAt.toISOString(),
    externId: loc.externId,
    type: loc.type as LocationType,
    name: loc.name,
    description: loc.description,
    publishedAt: loc.publishedAt?.toISOString() || null,
    address: loc.address
      ? {
          lat: loc.address.lat,
          lng: loc.address.lng,
          formattedAddress: loc.address.formattedAddress,
          streetNumber: loc.address.streetNumber,
          route: loc.address.route,
          routeShort: loc.address.routeShort,
          locality: loc.address.locality,
          admininstrativeAreaLevel1: loc.address.admininstrativeAreaLevel1,
          admininstrativeAreaLevel1Short:
            loc.address.admininstrativeAreaLevel1Short,
          country: loc.address.country,
          countryShort: loc.address.countryShort,
          postalCode: loc.address.postalCode,
        }
      : null,
    bannerImageCfId: loc.bannerImageCfId,
    stewards: loc.stewards.map((s) => ({
      createdAt: s.profile.createdAt.toISOString(),
      externId: s.profile.externId,
      name: s.profile.name,
      email: s.profile.email,
      bio: s.profile.bio,
      citizenshipStatus: s.profile
        .citizenshipStatus as CitizenshipStatus | null,
      cabinTokenBalanceInt: s.profile.wallet
        ? s.profile.wallet.cabinTokenBalance.toNumber()
        : null,
      avatarCfId: s.profile.avatarCfId,
    })),
    mediaItems: loc.mediaItems.map((mi) => {
      return {
        category: mi.category as LocationMediaCategory,
        cfId: mi.cfId || '',
      }
    }),
    eventCount: loc._count.offers,
  }
}
