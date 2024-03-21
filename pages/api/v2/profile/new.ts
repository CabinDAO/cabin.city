import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  ProfileNewParams,
  ProfileNewParamsType,
  ProfileNewResponse,
} from '@/utils/types/profile'
import { createProfile } from '@/utils/profile'
import { toErrorString } from '@/utils/api/error'

export default withAuth(handler)

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

  let body: ProfileNewParamsType
  try {
    body = ProfileNewParams.parse(req.body)
  } catch (e) {
    res.status(400).send({ error: toErrorString(e) })
    return
  }

  let invite: Prisma.InviteGetPayload<null> | null = null
  if (body.inviteExternId) {
    invite = await prisma.invite.findUnique({
      where: { externId: body.inviteExternId },
    })

    if (!invite) {
      res.status(400).send({ error: 'Invite not found' })
      return
    }
  }

  const existingWallet = await prisma.wallet.findUnique({
    where: { address: body.walletAddress },
    include: { profile: true },
  })

  if (existingWallet && existingWallet.profile) {
    res
      .status(400)
      .send({ error: 'This wallet is already connected to an account' })
    return
  }

  const profile = await createProfile({
    privyDID,
    walletAddress: body.walletAddress,
    name: body.name,
    email: body.email,
    neighborhoodExternId: body.neighborhoodExternId,
    address: body.address,
    avatar: body.avatar,
    invite,
  })

  res.status(200).send({ externId: profile.externId })
}
