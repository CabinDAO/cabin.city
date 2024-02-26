import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ProfileNewResponse } from '@/utils/types/profile'
import { createProfile } from '@/utils/profile'

export type ProfileNewParams = {
  walletAddress: string
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
  inviteExternId?: string
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

  const profile = await createProfile({
    privyDID,
    walletAddress: body.walletAddress,
    name: body.name,
    email: body.email,
    avatar: body.avatar,
    invite,
  })

  res.status(200).send({ externId: profile.externId })
}

export default withAuth(handler)
