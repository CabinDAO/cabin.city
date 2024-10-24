import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { MessageNewParams, MessageNewResponse } from '@/utils/types/message'
import { toErrorString } from '@/utils/api/error'
import { isProd } from '@/utils/dev'
import { sendToDiscord } from '@/lib/discord'
import { sendEmail } from '@/lib/mail/sendgrid-service'
import { emailSentEvent } from '@/lib/googleAnalytics/analytics'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageNewResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const sender = await requireProfile(opts.auth)

  const parsed = MessageNewParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const recipient = await prisma.profile.findUnique({
    where: { externId: params.recipientExternId },
  })
  if (!recipient) {
    res.status(404).send({ error: 'Recipient not found' })
    return
  }

  const accountAgeDays =
    (new Date().getTime() - new Date(recipient.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  const messageLimitPerDay = sender.isAdmin ? 9999 : accountAgeDays < 7 ? 3 : 6

  const messageCount = await prisma.message.count({
    where: {
      senderId: sender.id,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  })
  if (messageCount >= messageLimitPerDay) {
    res.status(429).send({
      error: `You've reached your message limit for the day. Try again tomorrow.`,
    })
    if (isProd) {
      await sendToDiscord(
        `${sender.name} (${sender.externId}) tried to message ${recipient.name} (${recipient.externId}) but hit their message limit for the day.`
      )
    }
    return
  }

  await prisma.message.create({
    data: {
      sender: { connect: { externId: sender.externId } },
      recipient: { connect: { externId: params.recipientExternId } },
      text: params.text,
    },
  })

  if (isProd) {
    await sendToDiscord(
      `New message from ${sender.name} (${sender.externId}) to ${recipient.name} (${recipient.externId}): ${params.text}`
    )
  }

  emailSentEvent(sender.externId, recipient.externId)

  await sendEmail(
    recipient.email,
    `New message from ${sender.name}`,
    params.text
  )

  res.status(200).send({ success: true })
}
