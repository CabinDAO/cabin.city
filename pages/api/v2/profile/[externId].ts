import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { $Enums, Prisma } from '@prisma/client'
import {
  AuthData,
  requireProfile,
  withAuth,
  ProfileWithWallet,
} from '@/utils/api/withAuth'
import {
  ProfileGetResponse,
  RoleLevel,
  RoleType,
  CitizenshipStatus,
  ProfileFragment,
  ContactFieldType,
  ProfileEditParams,
  ProfileEditResponse,
} from '@/utils/types/profile'

// must match the includes on query below
type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    voucher: {
      select: {
        externId: true
        name: true
      }
    }
    address: true
    avatar: {
      select: {
        url: true
      }
    }
    wallet: {
      select: {
        address: true
        cabinTokenBalance: true
        badges: {
          select: {
            id: true
            otterspaceBadgeId: true
            spec: true
          }
        }
      }
    }
    contactFields: true
    roles: {
      include: {
        walletHat: true
      }
    }
    locations: {
      select: {
        _count: true
      }
    }
  }
}>

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      return
    case 'POST':
      const profile = await requireProfile(req, res, opts)
      await handlePost(req, res, profile)
      return
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).send({ error: 'Method not allowed' })
      return
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const profile = await prisma.profile.findUnique({
    where: {
      externId: req.query.externId as string,
    },
    include: {
      // must match ProfileWithRelations above
      voucher: {
        select: {
          externId: true,
          name: true,
        },
      },
      address: true,
      avatar: {
        select: {
          url: true,
        },
      },
      wallet: {
        select: {
          address: true,
          cabinTokenBalance: true,
          badges: {
            select: {
              id: true,
              otterspaceBadgeId: true,
              spec: true,
            },
          },
        },
      },
      contactFields: true,
      roles: {
        include: {
          walletHat: true,
        },
      },
      locations: {
        select: {
          _count: true,
        },
      },
    },
  })

  res.status(profile ? 200 : 404).send({
    profile: profile
      ? profileToFragment(profile as ProfileWithRelations)
      : null,
  } as ProfileGetResponse)
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  profile: ProfileWithWallet
) {
  const params: ProfileEditParams = req.body
  const externId = req.query.externId as string

  if (externId != profile.externId && !profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  const profileToEdit = await prisma.profile.findUnique({
    where: {
      externId: externId,
    },
    include: {
      avatar: true,
    },
  })

  if (!profileToEdit) {
    res.status(404).send({ error: 'Profile not found' })
    return
  }

  const txns: Prisma.PrismaPromise<unknown>[] = [
    prisma.profile.update({
      data: {
        name: params.data.name,
        email: params.data.email,
        bio: params.data.bio,
        address: params.data.address
          ? {
              upsert: {
                create: params.data.address,
                update: params.data.address,
              },
            }
          : undefined,
      },
      where: {
        id: profileToEdit.id,
      },
    }),
  ]

  if (params.data.contactFields) {
    txns.push(
      prisma.profileContactField.deleteMany({
        where: {
          profileId: profileToEdit.id,
        },
      })
    )
    txns.push(
      prisma.profileContactField.createMany({
        data: params.data.contactFields.map((field) => ({
          type: field.type,
          value: field.value,
          profileId: profileToEdit.id,
        })),
      })
    )
  }

  if (params.data.avatar) {
    if (profileToEdit.avatar) {
      txns.push(
        prisma.avatar.delete({
          where: {
            profileId: profileToEdit.id,
          },
        })
      )
    }
    txns.push(
      prisma.avatar.create({
        data: {
          profileId: profileToEdit.id,
          ...params.data.avatar,
        },
      })
    )
  }

  if (params.roleTypes) {
    const newRoleTypes = params.roleTypes
    const currentRoles = await prisma.role.findMany({
      where: {
        profileId: profileToEdit.id,
        level: $Enums.RoleLevel.Apprentice,
      },
    })

    const rolesToDelete = currentRoles.filter((role) => {
      for (const newType of newRoleTypes) {
        if (role.type === newType) return false
      }
      return true
    })

    const rolesToAdd = newRoleTypes.filter((newType) => {
      for (const role of currentRoles) {
        if (role.type === newType) return false
      }
      return true
    })

    txns.push(
      prisma.role.deleteMany({
        where: {
          id: {
            in: rolesToDelete.map((role) => role.id),
          },
        },
      })
    )
    txns.push(
      prisma.role.createMany({
        data: rolesToAdd.map((type) => ({
          type: type as $Enums.RoleType,
          level: $Enums.RoleLevel.Apprentice,
          profileId: profileToEdit.id,
        })),
      })
    )
  }

  await prisma.$transaction(txns)
  res.status(200).send({
    success: true,
  } as ProfileEditResponse)
}

const profileToFragment = (profile: ProfileWithRelations): ProfileFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    privyDID: profile.privyDID,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    address: profile.address
      ? {
          locality: profile.address.locality,
          admininstrativeAreaLevel1Short:
            profile.address.admininstrativeAreaLevel1Short,
          country: profile.address.country,
          countryShort: profile.address.countryShort,
        }
      : undefined,
    citizenshipStatus: profile.citizenshipStatus as CitizenshipStatus,
    citizenshipTokenId: profile.citizenshipTokenId,
    citizenshipMintedAt: profile.citizenshipMintedAt
      ? profile.citizenshipMintedAt.toISOString()
      : null,
    cabinTokenBalanceInt: Math.floor(
      profile.wallet.cabinTokenBalance.toNumber()
    ),
    avatar: {
      url: profile.avatar ? profile.avatar.url : '',
    },
    voucher: profile.voucher
      ? {
          externId: profile.voucher.externId,
          name: profile.voucher.name,
        }
      : null,
    wallet: {
      address: profile.wallet.address,
      badges: profile.wallet.badges.map((badge) => ({
        id: badge.id,
        otterspaceBadgeId: badge.otterspaceBadgeId,
        spec: {
          name: badge.spec.name,
          description: badge.spec.description,
          image: badge.spec.image,
        },
      })),
    },
    contactFields: profile.contactFields.map((cf) => ({
      type: cf.type as ContactFieldType,
      value: cf.value,
    })),
    roles: profile.roles.map((role) => ({
      hatId: role.walletHat?.hatId || null,
      type: role.type as RoleType,
      level: role.level as RoleLevel,
    })),
  }
}

export default withAuth(handler)
