import { MailService, MailDataRequired } from '@sendgrid/mail'
import { MailData } from '@sendgrid/helpers/classes/mail'
import { EmailType, NewPurchasePayload, VouchRequstedPayload } from './types'
import { appDomainWithProto } from '@/utils/display-utils'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export class SendgridService {
  private client: MailService

  constructor() {
    this.client = new MailService()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmail(type: EmailType, data: object) {
    const md: MailData = {
      from: {
        name: 'CabinMail',
        email: process.env.SENDGRID_FROM_EMAIL,
      },
    }

    let d: any

    switch (type) {
      case EmailType.VOUCH_REQUESTED:
        d = data as VouchRequstedPayload

        if (!(d.name && d.email && d.profileId)) {
          throw new Error('required fields: name, email, profileId')
        }
        Object.assign(md, {
          to: EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS,
          subject: `${d.name} requested a vouch`,
          html: `<div>
            <a href="${appDomainWithProto}/profile/${d.profileId}">${d.name}</a> (<a href="mailto:${d.email}">${d.email}</a>) requested a vouch.
          </div>`,
          trackingSettings: {
            clickTracking: { enable: false },
            openTracking: { enable: false },
            subscriptionTracking: { enable: false },
          },
        })
        break

      case EmailType.NEW_PURCHASE:
        d = data as NewPurchasePayload

        if (!d.cartId) {
          throw new Error('required fields: cartId')
        }
        Object.assign(md, {
          to: EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS,
          subject: 'New cabin.city Purchase',
          html: `<div>
            <a href="${appDomainWithProto}/checkout/${d.cartId}">new purchase</a>.
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
    return await this.client.send(md as MailDataRequired)
  }
}
