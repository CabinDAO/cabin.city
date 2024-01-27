import type { NextApiRequest, NextApiResponse } from 'next'
import mustAuth from '@/utils/api/mustAuth'
import { prisma } from '@/utils/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

import {
  ProfileResponse,
  RoleLevel,
  RoleType,
  CitizenshipStatus,
  ProfileFragment,
  ContactFieldType,
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
    Avatar: {
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
    locations: {
      select: {
        _count: true
      }
    }
  }
}>

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.status(405).send({ message: 'Method not allowed' })
    return
  }

  try {
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
        Avatar: {
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
    } as ProfileResponse)
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientValidationError) {
      res.status(200).send({
        profile: null,
        error: `PrismaClientValidationError: ${e.message}`,
      } as ProfileResponse)
    } else {
      res.status(200).send({
        profile: null,
        error: e as string,
      } as ProfileResponse)
    }
  }
}

const profileToFragment = (profile: ProfileWithRelations): ProfileFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    externalUserId: profile.externalUserId,
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
    avatarUrl: profile.Avatar ? profile.Avatar.url : '',
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
      hatId: role.hatId,
      type: role.type as RoleType,
      level: role.level as RoleLevel,
    })),
  }
}

export default mustAuth(handler)

/*
fragment GetProfileById on Profile {
  contactFields {
    type
      value
  }
}

query GetProfileById($id: ID!) {
  findProfileByID(id: $id) {
  ...GetProfileById
  }
  activitiesByProfile(profileId: $id, _size: 2) {
    data {
    ...ActivityItem
    }
  }
}
*/
