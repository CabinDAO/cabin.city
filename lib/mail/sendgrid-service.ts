import { MailService, MailDataRequired } from '@sendgrid/mail'
import { EmailType } from './types'
import { appDomainWithProto } from '@/utils/display-utils'

export class SendgridService {
  private client: MailService

  constructor() {
    this.client = new MailService()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmail(type: EmailType, data: object) {
    if (data.from) {
      delete data.from
    }

    const md: MailDataRequired = {
      from: {
        name: 'CabinMail',
        email: process.env.SENDGRID_FROM_EMAIL,
      },
    }

    switch (type) {
      case EmailType.VOUCH_REQUESTED:
        if (!(data.name && data.email && data.profileId)) {
          throw new Error('required fields: name, email, profileId')
        }
        Object.assign(md, {
          to: 'home@cabin.city',
          subject: `${data.name} requested a vouch`,
          html: `<div>
            <a href="${appDomainWithProto}/profile/${data.profileId}">${data.name}</a> (<a href="mailto:${data.email}">${data.email}</a>) requested a vouch.
          </div>`,
          trackingSettings: {
            clickTracking: { enable: false },
            openTracking: { enable: false },
            subscriptionTracking: { enable: false },
          },
        })
        break

      default:
        throw new Error(`Invalid email type: '${type}'`)
    }

    if (!md.to) {
      throw new Error('email recipient missing')
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!process.env.SENDGRID_DEV_EMAIL) {
        throw new Error('process.env.SENDGRID_DEV_EMAIL is not set')
      }
      md.to = process.env.SENDGRID_DEV_EMAIL
    }

    console.log(`Sending email to ${md.to}`)
    return await this.client.send(md)
  }
}
