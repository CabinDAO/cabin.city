import { MailService, MailDataRequired } from '@sendgrid/mail'
import { EXTERNAL_LINKS } from '@/utils/external-links'

const footer = `Sent via Cabin.city Mail.\nIs this email spammy or inappropriate? Please forward it to ${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS} and we'll take care of it.`

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  text: string
) {
  if (!recipientEmail) {
    throw new Error('email recipient missing')
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    !process.env.SENDGRID_DEV_EMAIL
  ) {
    throw new Error('process.env.SENDGRID_DEV_EMAIL is not set')
  }

  const client = new MailService()
  client.setApiKey(process.env.SENDGRID_API_KEY)

  const to =
    process.env.NODE_ENV !== 'production'
      ? process.env.SENDGRID_DEV_EMAIL
      : recipientEmail

  const md: MailDataRequired = {
    to,
    from: {
      name: `CabinMail`,
      email: process.env.SENDGRID_FROM_EMAIL,
    },
    subject,
    text: `${text}\n\n---\n${footer}`,
  }

  console.log(`Sending email to ${md.to}`)
  return client.send(md)
}
