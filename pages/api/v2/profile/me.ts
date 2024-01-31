import type { NextApiRequest, NextApiResponse } from 'next'
import mustAuth from '@/utils/api/mustAuth'
import { prisma } from '@/utils/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

import {
  RoleLevel,
  RoleType,
  CitizenshipStatus,
  ContactFieldType,
  ProfileMeResponse,
  MeFragment,
} from '@/utils/types/profile'

// must match the includes on query below
type MyProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    _count: {
      select: {
        locations: true
      }
    }
    voucher: {
      select: {
        externId: true
        name: true
      }
    }
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
    roles: true
  }
}>

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: { privyDID: string } }
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        privyDID: opts.auth.privyDID,
      },
      include: {
        // must match MyProfileWithRelations above
        _count: {
          select: {
            locations: true,
          },
        },
        voucher: {
          select: {
            externId: true,
            name: true,
          },
        },
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
        roles: true,
      },
    })

    res.status(profile ? 200 : 404).send({
      me: profile ? profileToFragment(profile as MyProfileWithRelations) : null,
    } as ProfileMeResponse)
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientValidationError) {
      res.status(200).send({
        me: null,
        error: `PrismaClientValidationError: ${e.message}`,
      } as ProfileMeResponse)
    } else {
      res.status(200).send({
        me: null,
        error: e as string,
      } as ProfileMeResponse)
    }
  }
}

const profileToFragment = (profile: MyProfileWithRelations): MeFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    privyDID: profile.privyDID,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    location: profile.location,
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
    isAdmin: profile.isAdmin,
    isProfileSetupFinished: profile.isProfileSetupFinished,
    isProfileSetupDismissed: profile.isProfileSetupDismissed,
    mailingListOptIn: profile.mailingListOptIn,
    walletAddress: profile.wallet.address,
    locationCount: profile._count.locations,
    contactFields: profile.contactFields.map((cf) => ({
      type: cf.type as ContactFieldType,
      value: cf.value,
    })),
    voucher: profile.voucher
      ? {
          externId: profile.voucher.externId,
          name: profile.voucher.name,
        }
      : null,

    roles: profile.roles.map((role) => ({
      hatId: role.hatId,
      type: role.type as RoleType,
      level: role.level as RoleLevel,
    })),
  }
}

export default mustAuth(handler)
