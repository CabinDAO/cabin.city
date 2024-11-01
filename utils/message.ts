import { prisma } from '@/lib/prisma'
import { Profile, Message } from '@prisma/client'
import { randomId } from '@/utils/random'
import { isProd } from '@/utils/dev'
import { sendToDiscord } from '@/lib/discord'
import { messageSentEvent } from '@/lib/googleAnalytics/analytics'
import { appDomainWithProto } from '@/utils/display-utils'
import { expandRoute } from '@/utils/routing'
import { sendSendgridEmail } from '@/lib/mail/sendgrid-service'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export async function sendReplyError(
  recipientEmail: string,
  error: 'emailNotFound' | 'messageNotFound'
) {
  const message =
    error === 'emailNotFound'
      ? [
          `We couldn't find your account in our system. Use the email address associated with your Cabin.city account to reply.`,
          `You can find your Cabin.city email address on your <a href="${appDomainWithProto}${expandRoute(
            'profile'
          )}">profile page</a>.`,
          `Need help? Reply to this email (from any address) or message us on <a href="${EXTERNAL_LINKS.DISCORD}">Discord</a>.`,
        ].join('\n\n')
      : error === 'messageNotFound'
      ? [
          `We couldn't find the message you're replying to. Perhaps it was deleted?`,
          `If you believe this was an error, reply to this email and tell us what happened and we'll take care of it.`,
        ].join('\n\n')
      : 'An unknown error occurred while replying to your message.'

  await sendSendgridEmail({
    recipient: recipientEmail,
    subject: 'Your CabinMail reply did not go through 😔',
    html: nl2br(message),
    replyTo: EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS,
  })
}

export async function createAndSendMessage({
  sender,
  recipient,
  inReplyTo,
  text,
}: {
  sender: Profile
  recipient: Profile
  inReplyTo?: Message
  text: string
}) {
  const message = await prisma.message.create({
    data: {
      externId: randomId('message'),
      sender: { connect: { externId: sender.externId } },
      recipient: { connect: { externId: recipient.externId } },
      text: text,
      inReplyTo: inReplyTo ? { connect: { id: inReplyTo.id } } : undefined,
    },
  })

  if (isProd) {
    await sendToDiscord(
      `New message from ${sender.name} (${sender.externId}) to ${recipient.name} (${recipient.externId}): ${text}`
    )
  }

  await sendSendgridEmail({
    recipient: recipient.email,
    subject: `New message from ${sender.name}`,
    html: `${header(sender)}${nl2br(escapeHtml(text))}${footer(sender)}`,
    replyTo: {
      // name: `${sender.name} via CabinMail`, // might be nice later, but might clog ppl's address books since the email will change on each message
      email: replyToEmail(message.externId || message.id.toFixed()),
    },
  })

  messageSentEvent(sender.externId, recipient.externId)

  return message
}

function header(sender: Profile): string {
  return `<a href="${appDomainWithProto}${expandRoute([
    'profile_id',
    { id: sender.externId },
  ])}">${sender.name}</a> sent you a message:<br><br>`
}

function footer(sender: Profile): string {
  return `<br><br>You can reply directly to this email or by clicking Contact on <a style="text-decoration: underline;" href="${appDomainWithProto}${expandRoute(
    ['profile_id', { id: sender.externId }]
  )}">${
    sender.name
  }'s profile</a>.<br><br>---<br>Sent via Cabin.city Mail.<br>Is this email spammy or inappropriate? Please forward it to ${
    EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS
  } and we'll take care of it.`
}

export function messageExternIdFromReplyToEmail(replyToEmail: string): string {
  return replyToEmail.split('@')[0].split('+')[1]
}

function replyToEmail(externId: string): string {
  return `reply+${externId}@mail.cabin.city`
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function nl2br(str: string): string {
  return str.replace(/\n/g, '<br>')
}
