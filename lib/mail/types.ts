import { EXTERNAL_LINKS } from '@/utils/external-links'

export enum EmailType {
  VOUCH_REQUESTED = 'VOUCH_REQUESTED',
}

export interface EmailPayload {
  to: () => string
  subject: () => string
}

export class VouchRequstedPayload implements EmailPayload {
  to = () => EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS
  subject = () => `${this.name} wants a vouch plz`

  name = ''
  email = ''
  profileId = ''
}
