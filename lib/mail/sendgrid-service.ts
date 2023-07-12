import { MailService } from '@sendgrid/mail'
import { EmailPayload, EmailType, VouchDto } from './types'

export class SendgridService {
  private client: MailService

  constructor() {
    this.client = new MailService()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)
  }

  /**
   * Send an email using Sendgrid
   * @param to
   * @param data
   */
  async sendEmail(to: string, data: EmailPayload, type: EmailType) {
    let payload: EmailPayload

    switch (type) {
      case EmailType.VOUCHED:
        payload = new VouchDto()
        Object.assign(payload, data)
        break
      default:
        throw new Error('Invalid email type')
    }

    if (payload.templateId) {
      return await this.client.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        templateId: payload.templateId,
        personalizations: [
          {
            to,
            dynamicTemplateData: payload,
          },
        ],
        ...(payload.sendSubject && { subject: payload.subject() }),
      })
    } else {
      throw new Error('Missing templateId or subject from ../types')
    }
  }
}
