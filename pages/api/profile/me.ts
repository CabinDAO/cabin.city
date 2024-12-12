import type { NextApiRequest, NextApiResponse } from 'next'
import { OptsWithAuth, requireAuth, wrapHandler } from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  CitizenshipStatus,
  ContactFieldType,
  ProfileMeResponse,
  MeFragment,
  ProfileTag,
} from '@/utils/types/profile'
import { randomInviteCode } from '@/utils/random'
import { Address } from 'viem'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileMeResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (!opts.auth.authToken) {
    res.status(200).send({ result: 'no_auth_token', me: null })
    return
  }

  if (!opts.auth.privyDID) {
    res.status(200).send({ result: 'invalid_auth_token', me: null })
    return
  }

  const privyDID = requireAuth(opts)

  const profile = await prisma.profile.findUnique({
    where: { privyDID: privyDID },
    include: MyProfileQueryInclude,
  })

  if (!profile) {
    res.status(200).send({ result: 'profile_not_found', me: null })
    return
  }

  if (!profile.inviteCode) {
    const updatedProfile = await prisma.profile.update({
      where: { id: profile.id },
      data: { inviteCode: randomInviteCode() },
    })
    profile.inviteCode = updatedProfile.inviteCode
  }

  res.status(200).send({
    result: 'success',
    me: profileToFragment(profile as MyProfileWithRelations),
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
    inviteCode: profile.inviteCode ?? '',
    citizenshipStatus: profile.citizenshipStatus as CitizenshipStatus,
    citizenshipTokenId: profile.citizenshipTokenId,
    citizenshipMintedAt: profile.citizenshipMintedAt
      ? profile.citizenshipMintedAt.toISOString()
      : null,
    cabinTokenBalanceInt: profile.wallet
      ? Math.floor(profile.wallet.cabinTokenBalance.toNumber())
      : null,
    avatarCfId: profile.avatarCfId,
    tags: profile.tags as ProfileTag[],
    isAdmin: profile.isAdmin,
    isProfileSetupFinished: profile.isProfileSetupFinished,
    isProfileSetupDismissed: profile.isProfileSetupDismissed,
    mailingListOptIn: profile.mailingListOptIn,
    walletAddress: (profile.wallet?.address as Address) || null,
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
  }
}

export default wrapHandler(handler)

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
    wallet: {
      select: {
        address: true
        cabinTokenBalance: true
      }
    }
    contactFields: true
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
  wallet: {
    select: {
      address: true,
      cabinTokenBalance: true,
    },
  },
  contactFields: true,
}
