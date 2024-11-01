import { MailService, MailDataRequired } from '@sendgrid/mail'
import { EmailData } from '@sendgrid/helpers/classes/email-address'

export async function sendSendgridEmail({
  recipient,
  subject,
  html,
  replyTo,
}: {
  recipient: EmailData
  subject: string
  html: string
  replyTo?: EmailData
}) {
  const missingEmail =
    (typeof recipient === 'string' && !recipient) ||
    (typeof recipient === 'object' && !recipient.email)
  if (missingEmail) {
    throw new Error('recipient email missing')
  }

  let to: EmailData
  if (process.env.NODE_ENV === 'production') {
    to = recipient
  } else {
    if (!process.env.SENDGRID_DEV_EMAIL) {
      throw new Error('process.env.SENDGRID_DEV_EMAIL is not set')
    }
    to = process.env.SENDGRID_DEV_EMAIL
  }

  const client = new MailService()
  client.setApiKey(process.env.SENDGRID_API_KEY)

  const md: MailDataRequired = {
    to,
    from: {
      name: `CabinMail`,
      email: process.env.SENDGRID_FROM_EMAIL,
    },
    subject,
    html,
    replyTo,
  }

  console.log(`Sending email to ${md.to}`)
  return client.send(md)
}
