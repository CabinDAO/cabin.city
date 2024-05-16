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
  LocationSort,
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

  if (
    params.sort == LocationSort.distAsc &&
    (params.lat === undefined || params.lng === undefined)
  ) {
    res.status(400).send({ error: 'Missing lat/lng for distance sort' })
    return
  }

  const idsInOrder = await sortPrequery(params, skip, take)

  const query: Prisma.LocationFindManyArgs = {
    where: {
      id: { in: idsInOrder },
      steward: params.mineOnly ? { privyDID: maybeCurrentPrivyDID } : undefined,
    },
    include: LocationQueryInclude({
      activeEventsOnly: params.activeEventsOnly === 'true',
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
  offset: number,
  limit: number
) => {
  const sort = params.sort || LocationSort.nameAsc

  const sortByDist = sort === LocationSort.distAsc && params.lat && params.lng
  const maxDistance = sortByDist ? params.maxDist || 100 : null
  const distQuery = sortByDist
    ? Prisma.sql`(6371 * 2 * ASIN(SQRT(
      POWER(SIN((radians(a.lat) - radians(${params.lat})) / 2), 2) +
      COS(radians(${params.lat})) * COS(radians(a.lat)) *
      POWER(SIN((radians(a.lng) - radians(${params.lng})) / 2), 2)
    )))`
    : Prisma.sql`0`

  const ids = await prisma.$queryRaw<{ id: number; distance_in_km: number }[]>`
    SELECT l.id, ${distQuery} AS distance_in_km
    FROM "Location" l
    ${
      sortByDist
        ? Prisma.sql`INNER JOIN "Address" a ON l.id = a."locationId"`
        : Prisma.empty
    }
    ${
      params.offerType
        ? Prisma.sql`INNER JOIN "Offer" o ON l.id = o."locationId" AND o.type = ${params.offerType}`
        : Prisma.empty
    }
    LEFT JOIN "Profile" mem ON l.id = mem."neighborhoodId"
    WHERE ${
      params.locationType
        ? Prisma.sql`l.type = ${params.locationType}`
        : Prisma.sql`1=1`
    }
    GROUP BY l.id
    ORDER BY ${
      sortByDist
        ? Prisma.sql`distance_in_km ASC,`
        : sort === LocationSort.membersDesc
        ? Prisma.sql`COALESCE(COUNT(mem.id), 0) DESC,`
        : Prisma.empty
    } l.name ASC, l."createdAt" ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  return ids
    .filter((row) => !maxDistance || row.distance_in_km <= maxDistance)
    .reduce((ids: number[], row) => [...ids, row.id], [])
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
    steward: {
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
    },
    mediaItems: loc.mediaItems.map((mi) => {
      return {
        category: mi.category as LocationMediaCategory,
        ipfsHash: mi.ipfsHash,
      }
    }),
    offerCount: loc._count.offers,
    memberCount: loc._count.members,
    recentMembers: loc.members.map((m) => {
      return {
        externId: m.externId,
        avatar: {
          url: m.avatar ? m.avatar.url : '',
        },
      }
    }),
  }
}
