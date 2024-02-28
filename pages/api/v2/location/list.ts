import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  LocationFragment,
  LocationListParams,
  LocationListResponse,
  LocationSort,
  LocationType,
  LocationMediaCategory,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { OfferType } from '@/utils/types/offer'
import { CitizenshipStatus, RoleLevel, RoleType } from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationListResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const params: LocationListParams = {
    // searchQuery: req.query.searchQuery
    //   ? (req.query.searchQuery as string)
    //   : undefined,
    offerType: req.query.offerType
      ? (req.query.offerType as OfferType)
      : undefined,
    locationType: req.query.locationType
      ? (req.query.locationType as LocationType)
      : undefined,
    sort: req.query.sort ? (req.query.sort as LocationSort) : undefined,
    page: req.query.page ? parseInt(req.query.page as string) : undefined,
  }

  // TODO: data validation

  const skip = params.page ? PAGE_SIZE * (params.page - 1) : 0
  const take = PAGE_SIZE

  const idsInOrder = await sortByVoteCountPrequery(
    params.sort || LocationSort.nameAsc,
    params.offerType,
    params.locationType,
    skip,
    take
  )

  const query: Prisma.LocationFindManyArgs = {
    where: { id: { in: idsInOrder } },
    include: LocationQueryInclude,
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
const sortByVoteCountPrequery = async (
  sort: LocationSort,
  offerType: OfferType | undefined,
  locationType: LocationType | undefined,
  offset: number,
  limit: number
) => {
  const ids = await prisma.$queryRaw<{ id: number }[]>`
    SELECT l.id
    FROM "Location" l
    ${
      offerType
        ? Prisma.sql`INNER JOIN "Offer" o ON l.id = o."locationId" AND o.type = ${offerType}`
        : Prisma.empty
    }
    LEFT JOIN "LocationVote" lv ON l.id = lv."locationId"
    WHERE l."publishedAt" IS NOT NULL AND ${
      locationType ? Prisma.sql`l.type = ${locationType}` : Prisma.sql`1=1`
    }
    GROUP BY l.id
    ORDER BY ${
      sort === LocationSort.votesDesc
        ? Prisma.sql`COALESCE(SUM(lv.count), 0) DESC,`
        : Prisma.empty
    } l.name ASC, l."createdAt" ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  return ids.reduce((acc: number[], val) => [...acc, val.id], [])
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
    sleepCapacity: loc.sleepCapacity,
    internetSpeedMbps: loc.internetSpeedMbps,
    caretaker: {
      createdAt: loc.caretaker.createdAt.toISOString(),
      externId: loc.caretaker.externId,
      name: loc.caretaker.name,
      email: loc.caretaker.email,
      bio: loc.caretaker.bio,
      citizenshipStatus: loc.caretaker
        .citizenshipStatus as CitizenshipStatus | null,
      cabinTokenBalanceInt: loc.caretaker.wallet.cabinTokenBalance.toNumber(),
      avatar: loc.caretaker.avatar
        ? {
            url: loc.caretaker.avatar.url,
          }
        : undefined,
      roles: loc.caretaker.roles.map((role) => ({
        hatId: role.walletHat?.hatId || null,
        type: role.type as RoleType,
        level: role.level as RoleLevel,
      })),
    },
    caretakerEmail: loc.caretakerEmail,
    publishedAt: loc.publishedAt ? loc.publishedAt.toISOString() : null,
    mediaItems: loc.mediaItems.map((mi) => {
      return {
        category: mi.category as LocationMediaCategory,
        ipfsHash: mi.ipfsHash,
      }
    }),
    offerCount: loc._count.offers,
    recentVoters: loc.votes.slice(0, 3).map((vote) => {
      return {
        externId: vote.profile.externId,
        avatar: {
          url: vote.profile.avatar ? vote.profile.avatar.url : '',
        },
      }
    }),
    voteCount: loc.votes
      .map((vote) => {
        return vote.count
      })
      .reduce((a, b) => a + b, 0),
  }
}

export default withAuth(handler)
