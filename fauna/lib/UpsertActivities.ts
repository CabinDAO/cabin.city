import { query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { ActivityType, ProfileRoleType } from '../../generated/graphql'
import { GetProfileByAddress } from './GetProfileByAddress'
import { RefFromSet } from './RefFromSet'

export interface NewActivity {
  key: string
  address: string
  timestamp: string
  type: ActivityType
  profileRoleAdded?: ProfileRoleType
  transactionId?: string
  blockNumber?: string
  metadata?: object
}

export const UpsertActivities = (activities: NewActivity[]) => {
  return activities.map((activity) =>
    q.Let(
      {
        profile: GetProfileByAddress(activity.address),
        existingActivitySet: q.Match(
          q.Index('unique_Activity_key'),
          activity.key
        ),
      },
      q.If(
        q.IsNull(q.Var('profile')),
        // Profile does not exist, skip activity
        null,

        // Profile exists, upsert the activity
        q.Let(
          {
            data: q.Merge({ profile: SelectRef(q.Var('profile')) }, activity),
          },
          q.If(
            q.IsEmpty(q.Var('existingActivitySet')),
            // Activity does not exist, create it
            q.Create(q.Collection('Activity'), {
              data: q.Var('data'),
            }),
            // Activity already exists, update it
            q.Update(RefFromSet(q.Var('existingActivitySet')), {
              data: q.Var('data'),
            })
          )
        )
      )
    )
  )
}
