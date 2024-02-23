import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'
import {
  Profile,
  RoleType,
  RoleLevel,
  ActivityType,
  Prisma,
  CitizenshipStatus,
} from '@prisma/client'
import { getRoleInfoFromHat } from '@/lib/hats/hats-utils'
import { randomId, randomInviteCode } from '@/utils/random'
import { ProfileNewResponse } from '@/utils/types/profile'

export type ProfileNewParams = {
  address: string
  name: string
  email: string
  avatar?: {
    url: string
    contractAddress?: string | null
    title?: string | null
    tokenId?: string | null
    tokenUri?: string | null
    network?: string | null
  }
  claimedInviteExternId?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileNewResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const privyDID = requireAuth(req, res, opts)
  const body = req.body as ProfileNewParams

  let claimedInvite: Prisma.PartialInviteClaimGetPayload<null> | null = null
  if (body.claimedInviteExternId) {
    claimedInvite = await prisma.partialInviteClaim.findUnique({
      where: { externId: body.claimedInviteExternId },
    })

    if (!claimedInvite) {
      res.status(400).send({ error: 'Invite claim not found' })
      return
    }
  }

  const profile = await prisma.profile.create({
    data: {
      externId: randomId('profile'),
      privyDID: privyDID,
      name: body.name,
      email: body.email,
      bio: '',
      location: '',
      inviteCode: randomInviteCode(),
      wallet: {
        connectOrCreate: {
          where: {
            address: body.address,
          },
          create: {
            address: body.address,
            cabinTokenBalance: '0',
          },
        },
      },
      avatar: body.avatar
        ? {
            create: {
              url: body.avatar.url,
              contractAddress: body.avatar.contractAddress,
              title: body.avatar.title,
              tokenId: body.avatar.tokenId,
              tokenUri: body.avatar.tokenUri,
              network: body.avatar.network,
            },
          }
        : undefined,

      citizenshipStatus: claimedInvite ? CitizenshipStatus.Vouched : undefined, // should this be verified? the only way to get to this flow is through instant citizenship
      voucher: claimedInvite
        ? { connect: { id: claimedInvite.inviterId } }
        : undefined,
      claimedInvite: claimedInvite
        ? { connect: { id: claimedInvite.id } }
        : undefined,
    },
  })

  const activityKey = `ProfileCreated|${profile.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.ProfileCreated,
      profileId: profile.id,
    },
    update: {},
  })

  await createHats(profile)

  if (claimedInvite) {
    // TODO: check if they have a paid cart. if they do, airdrop them citizenship (or maybe it should be a separate api call???)
    // TODO: prolly also need to make sure that when UNLOCK_REFETCH_STATUS is hit,
    // it returns the correct status (might be a race condition with Alchemy)
  }

  res.status(200).send({ externId: profile.externId })
}

async function createHats(profile: Profile) {
  const walletHats = await prisma.walletHat.findMany({
    where: {
      walletId: profile.walletId,
    },
    include: {
      hat: true,
    },
  })

  if (!walletHats.length) return

  const rolesToAdd = walletHats
    .map((wh) => {
      const r = getRoleInfoFromHat(wh.hat.hatsProtocolId)

      return {
        walletHatId: wh.id,
        type: r?.type,
        level: r?.level,
      }
    })
    .filter((r) => r.type && r.level)

  await prisma.role.createMany({
    data: rolesToAdd.map((r) => {
      return {
        profileId: profile.id,
        walletHatId: r.walletHatId,
        type: r.type as RoleType,
        level: r.level as RoleLevel,
      }
    }),
    skipDuplicates: true,
  })
}

export default withAuth(handler)
