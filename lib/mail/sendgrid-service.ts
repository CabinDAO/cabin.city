import { MailService, MailDataRequired } from '@sendgrid/mail'

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  html: string
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
    html,
  }

  console.log(`Sending email to ${md.to}`)
  return client.send(md)
}
