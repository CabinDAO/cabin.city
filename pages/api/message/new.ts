import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { MessageNewParams, MessageNewResponse } from '@/utils/types/message'
import { toErrorString } from '@/utils/api/error'
import { isProd } from '@/utils/dev'
import { sendToDiscord } from '@/lib/discord'
import { sendEmail } from '@/lib/mail/sendgrid-service'
import { messageSentEvent } from '@/lib/googleAnalytics/analytics'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { appDomainWithProto } from '@/utils/display-utils'
import { expandRoute } from '@/utils/routing'

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

  const accountAgeDays =
    (new Date().getTime() - new Date(recipient.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  const messageLimitPerDay = sender.isAdmin
    ? 9999
    : sender.id == 93 // eileen
    ? 100
    : accountAgeDays < 7
    ? 3
    : 6

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

  messageSentEvent(sender.externId, recipient.externId)

  const header = `<a href="${appDomainWithProto}${expandRoute([
    'profile_id',
    { id: sender.externId },
  ])}">${sender.name}</a> sent you a message:<br><br>`
  const footer = `<br><br><a style="text-decoration: underline;" href="${appDomainWithProto}${expandRoute(
    ['profile_id', { id: sender.externId }]
  )}">Click here to reply</a>.<br><br>---<br>Sent via Cabin.city Mail.<br>Is this email spammy or inappropriate? Please forward it to ${
    EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS
  } and we'll take care of it.`

  await sendEmail(
    recipient.email,
    `New message from ${sender.name}`,
    `${header}${nl2br(escapeHtml(params.text))}${footer}`
  )

  res.status(200).send({ success: true })
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function nl2br(str: string) {
  return str.replace(/\n/g, '<br>')
}
