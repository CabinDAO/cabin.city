import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { resolveAddressOrName } from '@/lib/ens'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  RoleType,
  RoleLevel,
  CitizenshipStatus,
  ProfileSort,
  ProfileListParams,
  ProfileListResponse,
  ProfileListFragment,
} from '@/utils/types/profile'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileListResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  requireAuth(req, res, opts)

  const parsed = ProfileListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const resolvedAddress = params.searchQuery
    ? await resolveAddressOrName(params.searchQuery)
    : undefined

  const profileQuery: Prisma.ProfileFindManyArgs = {
    where: {
      name:
        !resolvedAddress && params.searchQuery
          ? {
              contains: params.searchQuery,
              mode: 'insensitive',
            }
          : undefined,
      location: params.withLocation == 'true' ? { not: '' } : undefined,
      address: params.withLocation == 'true' ? { is: null } : undefined,
      roles:
        params.roleTypes?.length || params.levelTypes?.length
          ? {
              some: {
                type: params.roleTypes?.length
                  ? {
                      in: params.roleTypes,
                    }
                  : undefined,
                level: params.levelTypes?.length
                  ? {
                      in: params.levelTypes,
                    }
                  : undefined,
              },
            }
          : undefined,
      citizenshipStatus: params.citizenshipStatuses?.length
        ? {
            in: params.citizenshipStatuses,
          }
        : undefined,
      wallet: resolvedAddress
        ? {
            address: {
              equals: resolvedAddress,
              mode: 'insensitive',
            },
          }
        : undefined,
    },
    include: ListedProfileQueryInclude,
    orderBy: sortOrder(params.sort),
    skip: params.page ? PAGE_SIZE * (params.page - 1) : undefined,
    take: PAGE_SIZE,
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [profiles, totalCount] = await prisma.$transaction([
    prisma.profile.findMany(profileQuery),
    prisma.profile.count({ where: profileQuery.where }),
  ])

  // console.log(count, profiles)
  res.status(200).send({
    profiles: profilesToFragments(profiles as ListedProfileWithRelations[]),
    count: profiles.length,
    totalCount,
  })
}

const sortOrder = (
  sortParam: ProfileSort | undefined
): Prisma.ProfileOrderByWithRelationInput => {
  switch (sortParam) {
    case ProfileSort.CabinBalanceAsc:
      return {
        wallet: {
          cabinTokenBalance: 'asc',
        },
      }
    case ProfileSort.CabinBalanceDesc:
      return {
        wallet: {
          cabinTokenBalance: 'desc',
        },
      }
    case ProfileSort.BadgeCountAsc:
      return {
        wallet: {
          badges: {
            _count: 'asc',
          },
        },
      }
    case ProfileSort.BadgeCountDesc:
      return {
        wallet: {
          badges: {
            _count: 'desc',
          },
        },
      }
    case ProfileSort.CreatedAtDesc:
      return {
        createdAt: 'desc',
      }
    case ProfileSort.CreatedAtAsc:
    default:
      return {
        createdAt: 'asc',
      }
  }
}

const profilesToFragments = (
  profiles: ListedProfileWithRelations[]
): ProfileListFragment[] => {
  return profiles.map((profile) => {
    return {
      createdAt: profile.createdAt.toISOString(),
      externId: profile.externId,
      privyDID: profile.privyDID,
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      isAdmin: profile.isAdmin,
      mailingListOptIn: profile.mailingListOptIn,
      voucherId: profile.voucherId,
      citizenshipStatus: profile.citizenshipStatus as CitizenshipStatus,
      citizenshipTokenId: profile.citizenshipTokenId,
      citizenshipMintedAt: profile.citizenshipMintedAt
        ? profile.citizenshipMintedAt?.toISOString()
        : null,
      address: profile.address
        ? {
            locality: profile.address.locality,
            admininstrativeAreaLevel1Short:
              profile.address.admininstrativeAreaLevel1Short,
            country: profile.address.country,
            countryShort: profile.address.countryShort,
          }
        : null,
      avatar: profile.avatar
        ? {
            url: profile.avatar.url,
            contractAddress: profile.avatar.contractAddress,
            network: profile.avatar.network,
            title: profile.avatar.title,
            tokenId: profile.avatar.tokenId,
            tokenUri: profile.avatar.tokenUri,
          }
        : undefined,
      roles: profile.roles.map((role) => ({
        hatId: role.walletHat?.hatId || null,
        type: role.type as RoleType,
        level: role.level as RoleLevel,
      })),
      badgeCount: profile.wallet._count.badges,
      cabinTokenBalanceInt: Math.floor(
        profile.wallet.cabinTokenBalance.toNumber()
      ),
    }
  })
}

// must match ListedProfileQueryInclude below
type ListedProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    address: true
    avatar: true
    wallet: {
      include: {
        _count: {
          select: {
            badges: true
          }
        }
      }
    }
    roles: {
      include: {
        walletHat: true
      }
    }
  }
}>

// must match ListedProfileWithRelations  above
const ListedProfileQueryInclude = {
  address: true,
  avatar: true,
  wallet: {
    include: {
      _count: {
        select: {
          badges: true,
        },
      },
    },
  },
  roles: {
    include: {
      walletHat: true,
    },
  },
} satisfies Prisma.ProfileInclude
