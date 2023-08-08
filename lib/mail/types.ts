import { emailConfig } from './config'
import { appDomainWithProto } from '@/utils/display-utils'

export enum EmailType {
  VOUCHED = 'VOUCHED',
  VOUCH_REQUESTED = 'VOUCH_REQUESTED',
}

export type PayloadMapping = {
  VOUCHED: VouchPayload
  VOUCH_REQUESTED: VouchRequstedPayload
}

export class VouchPayload implements EmailPayload {
  templateId = emailConfig.vouchedTemplateId
  to = () => {
    throw new Error('not implemented')
    return ''
  }
  subject = () => `${this.prospectiveName}, you have been vouched!`

  prospectiveName = ''
  prospectiveEmail = ''
  voucher = ''
  sendSubject = false
}

export class VouchRequstedPayload implements EmailPayload {
  constructor(data: object) {
    Object.assign(this, data)
    if (this.profileId) {
      this.profileLink = `${appDomainWithProto}/profile/${this.profileId}`
    }
  }

  templateId = emailConfig.vouchRequestedTemplateId
  to = () =>
    process.env.NODE_ENV === 'production'
      ? 'grin@cabin.city'
      : (process.env.SENDGRID_DEV_EMAIL as string)
  subject = () => `${this.name} wants a vouch plz`

  name = ''
  profileId = ''
  profileLink = ''
  sendSubject = true
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface EmailPayload {
  templateId: string
  to: () => string
  subject: () => string
  sendSubject?: boolean
}

export type ConditionalEmailPayloadType<
  K extends keyof PayloadMapping = keyof PayloadMapping
> = {
  [P in K]: PayloadMapping[P]
}[K]
