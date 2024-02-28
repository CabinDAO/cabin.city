export enum EmailType {
  VOUCH_REQUESTED = 'VOUCH_REQUESTED',
  NEW_PURCHASE = 'NEW_PURCHASE',
  NEW_LOCATION = 'NEW_LOCATION',
  NEW_CITIZENSHIP = 'NEW_CITIZENSHIP',
}

export class VouchRequstedPayload {
  name = ''
  email = ''
  profileId = ''
}

export class NewPurchasePayload {
  cartExternId = ''
  inviteExternId = ''
}

export class NewLocationPayload {
  locationId = ''
}

export class NewCitizenshipPayload {
  profileId = ''
}
