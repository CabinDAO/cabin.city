import { MailService } from '@sendgrid/mail'
import {
  EmailPayload,
  EmailType,
  VouchPayload,
  VouchRequstedPayload,
} from './types'
import { appDomainWithProto } from '@/utils/display-utils'

export class SendgridService {
  private client: MailService

  constructor() {
    this.client = new MailService()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmail(data: object, type: EmailType) {
    let payload: EmailPayload

    switch (type) {
      case EmailType.VOUCHED:
        throw new Error(`Vouch emails disabled for now`)
        payload = new VouchPayload()
        Object.assign(payload, data)
        break
      case EmailType.VOUCH_REQUESTED:
        payload = new VouchRequstedPayload(data)
        break
      default:
        throw new Error(`Invalid email type: '${type}'`)
    }

    if (!payload.templateId) {
      throw new Error('Missing templateId or subject from ../types')
    }

    const recipientEmail =
      process.env.NODE_ENV === 'production'
        ? payload.to()
        : process.env.SENDGRID_DEV_EMAIL

    if (!recipientEmail) {
      throw new Error(
        'recipient missing or process.env.SENDGRID_DEV_EMAIL is not set'
      )
    }

    console.log(`Sending email to ${recipientEmail}`)
    return await this.client.send({
      to: recipientEmail,
      from: process.env.SENDGRID_FROM_EMAIL,
      templateId: payload.templateId,
      personalizations: [
        {
          to: recipientEmail,
          dynamicTemplateData: payload,
        },
      ],
      ...(payload.sendSubject && { subject: payload.subject() }),
    })
  }
}
