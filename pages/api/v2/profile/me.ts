import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  RoleLevel,
  RoleType,
  CitizenshipStatus,
  ContactFieldType,
  ProfileMeResponse,
  MeFragment,
} from '@/utils/types/profile'
import { randomInviteCode } from '@/utils/random'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileMeResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (!opts.auth.authToken || !opts.auth.privyDID) {
    res.status(200).send({ me: null })
    return
  }

  const privyDID = requireAuth(req, res, opts)

  const profile = await prisma.profile.findUnique({
    where: { privyDID: privyDID },
    include: MyProfileQueryInclude,
  })

  if (profile && !profile.inviteCode) {
    const updatedProfile = await prisma.profile.update({
      where: { id: profile.id },
      data: { inviteCode: randomInviteCode() },
    })
    profile.inviteCode = updatedProfile.inviteCode
  }

  res.status(profile ? 200 : 404).send({
    me: profile ? profileToFragment(profile as MyProfileWithRelations) : null,
  })
}

const profileToFragment = (profile: MyProfileWithRelations): MeFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    privyDID: profile.privyDID,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    address: profile.address || undefined,
    neighborhoodExternId: profile.neighborhood
      ? profile.neighborhood.externId
      : null,
    inviteCode: profile.inviteCode ?? '',
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
    locationCount: profile._count.stewardedLocations,
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
      hatId: role.walletHat?.hatId || null,
      type: role.type as RoleType,
      level: role.level as RoleLevel,
    })),
  }
}

export default withAuth(handler)

// must match MyProfileQueryInclude below
type MyProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    _count: {
      select: {
        stewardedLocations: true
      }
    }
    voucher: {
      select: {
        externId: true
        name: true
      }
    }
    address: true
    neighborhood: {
      select: {
        externId: true
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
    roles: {
      include: {
        walletHat: true
      }
    }
  }
}>

const MyProfileQueryInclude = {
  // must match MyProfileWithRelations above
  _count: {
    select: {
      stewardedLocations: true,
    },
  },
  voucher: {
    select: {
      externId: true,
      name: true,
    },
  },
  address: true,
  neighborhood: {
    select: {
      externId: true,
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
  roles: {
    include: {
      walletHat: true,
    },
  },
}
