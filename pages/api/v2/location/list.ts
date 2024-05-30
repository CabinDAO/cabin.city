import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import { PAGE_SIZE } from '@/utils/api/backend'
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

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationListResponse>,
  opts: { auth: AuthData }
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

  const maybeCurrentPrivyDID = opts.auth.privyDID || '0'

  const skip = params.page ? PAGE_SIZE * (params.page - 1) : 0
  const take = PAGE_SIZE

  if ((params.lat === undefined) !== (params.lng === undefined)) {
    res
      .status(400)
      .send({ error: 'One of lat/lng is provided but the other is missing' })
    return
  }

  const idsInOrder = await sortPrequery(
    params,
    maybeCurrentPrivyDID,
    skip,
    take
  )

  const query: Prisma.LocationFindManyArgs = {
    where: {
      id: { in: idsInOrder },
      steward: params.mineOnly ? { privyDID: maybeCurrentPrivyDID } : undefined,
    },
    include: LocationQueryInclude({
      countActiveEventsOnly: params.countActiveEventsOnly === 'true',
    }),
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [locations, totalCount] = await prisma.$transaction([
    prisma.location.findMany(query),
    prisma.location.count({ where: query.where }),
  ])

  const sortedLocations = locations.sort((a, b) => {
    return idsInOrder.indexOf(a.id) - idsInOrder.indexOf(b.id)
  })

  res.status(200).send({
    locations: sortedLocations.map((location) =>
      locationToFragment(location as LocationWithRelations)
    ),
    count: locations.length,
    totalCount,
  })
}

// get ids for locations sorted in proper order
const sortPrequery = async (
  params: LocationListParamsType,
  maybeCurrentPrivyDID: string,
  offset: number,
  limit: number
) => {
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
        MAX(o."endDate") as "endDate", steward."privyDID" as "privyDID",
        ${distanceQuery} AS "distanceInKM"
      FROM "Location" l
      LEFT JOIN "Address" a ON l.id = a."locationId"
      LEFT JOIN "Offer" o ON l.id = o."locationId"
      LEFT JOIN "Profile" steward ON l."stewardId" = steward.id
      WHERE 
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
      GROUP BY 
        l.id, steward."privyDID", a.lat, a.lng
    )
    SELECT id
    FROM with_distance
    GROUP BY 
      id, "distanceInKM", "privyDID", type, name, "createdAt", "endDate"
    HAVING
      ${
        params.maxDist
          ? Prisma.sql`"distanceInKM" <= ${params.maxDist}`
          : Prisma.sql`1=1`
      }
    ORDER BY 
      "distanceInKM" ASC, 
      "privyDID" = ${maybeCurrentPrivyDID} DESC, 
      type = ${LocationType.Neighborhood}::"LocationType" DESC, 
      COALESCE(SUM(CASE WHEN "endDate" >= CURRENT_DATE THEN 1 ELSE 0 END), 0) DESC, 
      name ASC, 
      "createdAt" ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  // console.log(formatQuery(sqlQuery.inspect().sql, sqlQuery.inspect().values))
  const ids = await prisma.$queryRaw<{ id: number }[]>(sqlQuery)

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
    tagline: loc.tagline,
    description: loc.description,
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
    bannerImageIpfsHash: loc.bannerImageIpfsHash,
    steward: loc.steward
      ? {
          createdAt: loc.steward.createdAt.toISOString(),
          externId: loc.steward.externId,
          name: loc.steward.name,
          email: loc.steward.email,
          bio: loc.steward.bio,
          citizenshipStatus: loc.steward
            .citizenshipStatus as CitizenshipStatus | null,
          cabinTokenBalanceInt: loc.steward.wallet.cabinTokenBalance.toNumber(),
          avatar: loc.steward.avatar
            ? {
                url: loc.steward.avatar.url,
              }
            : undefined,
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
        ipfsHash: mi.ipfsHash,
      }
    }),
    eventCount: loc._count.offers,
  }
}
