import { query as q } from 'faunadb'
import { GetProfileByAddress } from './GetProfileByAddress'
import { UpsertActivity, UpsertActivityInput } from './UpsertActivity'

export interface AddressActivity {
  address: string
  activity: UpsertActivityInput
}

export const UpsertActivities = (addressActivities: AddressActivity[]) => {
  return addressActivities.map((addressActivity) =>
    q.Let(
      {
        profile: GetProfileByAddress(addressActivity.address),
      },
      UpsertActivity(q.Var('profile'), addressActivity.activity)
    )
  )
}
