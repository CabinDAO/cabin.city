export enum EmailType {
  VOUCH_REQUESTED = 'VOUCH_REQUESTED',
}

export interface EmailPayload {
  to: () => string
  subject: () => string
}

export class VouchRequstedPayload implements EmailPayload {
  to = () => 'home@cabin.city'
  subject = () => `${this.name} wants a vouch plz`

  name = ''
  email = ''
  profileId = ''
}
