export enum EmailType {
  VOUCH_REQUESTED = 'VOUCH_REQUESTED',
  NEW_PURCHASE = 'NEW_PURCHASE',
}

export class VouchRequstedPayload {
  name = ''
  email = ''
  profileId = ''
}

export class NewPurchasePayload {
  cartId = ''
}
