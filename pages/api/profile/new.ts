import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import { AxiosError } from 'axios'
import {
  OptsWithAuth,
  ProfileWithWallet,
  requireAuth,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ProfileNewParams, ProfileNewResponse } from '@/utils/types/profile'
import { isProd } from '@/utils/dev'
import { sendToDiscord } from '@/lib/discord'
import { expandRoute } from '@/utils/routing'
import { appDomainWithProto } from '@/utils/display-utils'
import { createProfile } from '@/utils/profile'
import { toErrorString } from '@/utils/api/error'
import { subscribe } from '@/lib/convertkit'
import analytics from '@/lib/googleAnalytics/analytics'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileNewResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const privyDID = requireAuth(opts)

  const parsed = ProfileNewParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  let invite: Prisma.InviteGetPayload<null> | null = null
  if (params.inviteExternId) {
    invite = await prisma.invite.findUnique({
      where: { externId: params.inviteExternId },
    })

    if (!invite) {
      res.status(400).send({ error: 'Invite not found' })
      return
    }
  }

  if (params.walletAddress) {
    const existingWallet = await prisma.wallet.findUnique({
      where: { address: params.walletAddress.toLowerCase() },
      include: { profile: true },
    })

    if (existingWallet && existingWallet.profile) {
      res
        .status(400)
        .send({ error: 'This wallet is already connected to an account' })
      return
    }
  }

  let profile: ProfileWithWallet | null = null
  try {
    profile = await createProfile({
      privyDID,
      walletAddress: params.walletAddress?.toLowerCase(),
      name: params.name,
      bio: params.bio,
      longBio: params.longBio,
      email: params.email,
      address: params.address,
      avatarCfId: params.avatarCfId,
      tags: params.tags,
      contactFields: params.contactFields,
      invite,
    })
  } catch (e: unknown) {
    Sentry.captureException(e, { extra: { privyDID } })
    throw e
  }

  if (isProd && params.subscribeToNewsletter) {
    try {
      await subscribe(params.email, { skipConfirmEmail: true })
      analytics.subscribeToNewsletterEvent(params.email)
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data)
      } else {
        console.error(e)
      }
    }
  }

  if (isProd) {
    await sendToDiscord(
      `New user ${profile.name}: ${appDomainWithProto}${expandRoute([
        'profile_id',
        { id: profile.externId },
      ])}`
    )
  }

  res.status(200).send({ externId: profile.externId })
}
