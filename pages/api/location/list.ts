import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import {
  OptsWithAuth,
  findProfile,
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
import { CitizenshipStatus, RoleLevel, RoleType } from '@/utils/types/profile'

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

  const profile = await findProfile(opts.auth)

  const idsInOrder = await sortPrequery(profile, params)

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
  profile: ProfileWithWallet | null,
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
      LEFT JOIN "Profile" steward ON l."stewardId" = steward.id
      WHERE
        ${
          params.searchQuery
            ? Prisma.sql`(l.name ILIKE ${`%${params.searchQuery}%`} OR a."formattedAddress" ILIKE ${`%${params.searchQuery}%`})`
            : Prisma.sql`1=1`
        }
        AND
        ${
          params.stewardExternId
            ? Prisma.sql`steward."externId" = ${params.stewardExternId}`
            : Prisma.sql`1=1`
        }
        AND
        ${
          params.locationType
            ? Prisma.sql`l.type = ${params.locationType}::"LocationType"`
            : Prisma.sql`1=1`
        }
        AND
        ${
          bounds.length === 4
            ? Prisma.sql`a.lat <= ${bounds[0]} AND a.lat >= ${bounds[1]} AND a.lng <= ${bounds[2]} AND a.lng >= ${bounds[3]}`
            : Prisma.sql`1=1`
        }
        AND
        ${
          profile?.isAdmin
            ? Prisma.sql`1=1`
            : Prisma.sql`l."publishedAt" IS NOT NULL ${
                profile
                  ? Prisma.sql`OR steward."privyDID" = ${profile.privyDID}`
                  : Prisma.sql``
              }`
        }
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
        profile
          ? Prisma.sql`"privyDID" = ${profile.privyDID} AND "publishedAt" IS NULL DESC, "privyDID" = ${profile.privyDID} DESC,`
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
    Sentry.captureException(error, { extra: { params, bounds } })
    if (error instanceof Error) {
      console.error('Failed to sort locations', {
        profileId: profile?.id,
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
    steward: loc.steward
      ? {
          createdAt: loc.steward.createdAt.toISOString(),
          externId: loc.steward.externId,
          name: loc.steward.name,
          email: loc.steward.email,
          bio: loc.steward.bio,
          citizenshipStatus: loc.steward
            .citizenshipStatus as CitizenshipStatus | null,
          cabinTokenBalanceInt: loc.steward.wallet
            ? loc.steward.wallet.cabinTokenBalance.toNumber()
            : null,
          avatarCfId: loc.steward.avatarCfId,
          roles: loc.steward.roles.map((role) => ({
            hatId: role.walletHat?.hatId || null,
            type: role.type as RoleType,
            level: role.level as RoleLevel,
          })),
        }
      : null,
    mediaItems: loc.mediaItems.map((mi) => {
      return {
        category: mi.category as LocationMediaCategory,
        cfId: mi.cfId || '',
      }
    }),
    eventCount: loc._count.offers,
  }
}
