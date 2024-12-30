import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { MessageNewParams, MessageNewResponse } from '@/utils/types/message'
import { toErrorString } from '@/utils/api/error'
import { isProd } from '@/utils/dev'
import { sendToDiscord } from '@/lib/discord'
import { createAndSendMessage } from '@/utils/message'

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

  const sender = await requireUser(opts.auth)

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

  if (sender.id == 1702 || sender.id == 1689) {
    await sendToDiscord(
      `${sender.name} (${sender.externId}) tried to message ${recipient.name} (${recipient.externId}).`
    )
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 500)
    )
    res.status(200).send({ success: true })
    return
  }

  const accountAgeDays =
    (new Date().getTime() - new Date(recipient.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  const messageLimitPerDay = sender.isAdmin ? 9999 : accountAgeDays < 7 ? 2 : 6

  const messageCount = await prisma.message.count({
    where: {
      senderId: sender.id,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  })

  if (messageCount >= messageLimitPerDay) {
    if (isProd) {
      await sendToDiscord(
        `${sender.name} (${sender.externId}) tried to message ${recipient.name} (${recipient.externId}) but hit their message limit for the day.`
      )
    }

    res.status(429).send({
      error: `You've reached your message limit for the day. Try again tomorrow.`,
    })
    return
  }

  await createAndSendMessage({
    sender,
    recipient,
    text: params.text,
  })

  res.status(200).send({ success: true })
}
