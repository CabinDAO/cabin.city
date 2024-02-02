import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
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
import { getImageUrlByIpfsHash } from '@/lib/image'
import { withAuth } from '@/utils/api/withAuth'

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

  const query: Prisma.LocationFindManyArgs = {
    where: {
      type: params.locationType,
      publishedAt: {
        not: null,
      },
      offers: {
        some: {
          type: params.offerType,
        },
      },
    },
    include: LocationQueryInclude,
    orderBy: sortOrder(params.sort),
    skip: params.page ? PAGE_SIZE * (params.page - 1) : undefined,
    take: PAGE_SIZE,
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [locations, count] = await prisma.$transaction([
    prisma.location.findMany(query),
    prisma.location.count({ where: query.where }),
  ])

  res.status(200).send({
    locations: locations.map((location) =>
      locationToFragment(location as LocationWithRelations)
    ),
    count,
  })
}

const sortOrder = (
  sortParam: LocationSort | undefined
):
  | Prisma.LocationOrderByWithRelationInput
  | Prisma.LocationOrderByWithRelationInput[] => {
  switch (sortParam) {
    case LocationSort.votesDesc:
      return {
        votes: {
          _count: 'desc',
        },
      }
    case LocationSort.nameAsc:
    default:
      return [
        {
          name: 'asc',
        },
        {
          createdAt: 'asc',
        },
      ]
  }
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
    bannerImageUrl: getImageUrlByIpfsHash(loc.bannerImageIpfsHash) ?? '',
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
        hatId: role.hatId,
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
    // offers: loc.offers,
    offerCount: loc._count.offers,
    recentVoters: loc.votes.slice(0, 3).map((vote) => {
      return {
        externId: vote.profile.externId,
        avatar: {
          url: vote.profile.avatar ? vote.profile.avatar.url : '',
        },
      }
    }), // TODO: return 3 most recent voters or move this to separate api
    voteCount: loc.votes
      .map((vote) => {
        return vote.count
      })
      .reduce((a, b) => a + b, 0), // TODO: return actual total votes or move to separate api
  }
}

export default withAuth(handler)
