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
      q.If(
        q.IsNull(q.Var('profile')),
        // Profile does not exist, skip activity
        null,
        UpsertActivity(q.Var('profile'), addressActivity.activity)
      )
    )
  )
}
