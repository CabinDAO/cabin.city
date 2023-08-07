import { emailConfig } from './config'

export enum EmailType {
  VOUCHED = 'VOUCHED',
}

export type PayloadMapping = {
  VOUCHED: VouchDto
}

export class VouchDto implements EmailPayload {
  templateId = emailConfig.vouchedTemplateId
  subject = () => `${this.prospective}, you have been vouched!`

  prospective = ''
  voucher = ''
  sendSubject = false
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface EmailPayload {
  templateId: string
  subject: () => string
  sendSubject?: boolean
}

export type ConditionalEmailPayloadType<
  K extends keyof PayloadMapping = keyof PayloadMapping
> = {
  [P in K]: PayloadMapping[P]
}[K]
