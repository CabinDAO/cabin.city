import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import {
  ActivityMetadata,
  ActivityType,
  ProfileRoleType,
} from '../../generated/graphql'
import { RefFromSet } from './RefFromSet'
import { ToTimestamp } from './ToTimestamp'

export interface UpsertActivityInput {
  key: string | Expr
  timestamp: string | Expr
  type: ActivityType
  profileRoleAdded?: ProfileRoleType
  transactionId?: string
  blockNumber?: string
  metadata?: ActivityMetadata
}

export const UpsertActivity = (profile: Expr, input: UpsertActivityInput) => {
  return q.Let(
    {
      existingActivitySet: q.Match(q.Index('unique_Activity_key'), input.key),
    },
    q.Let(
      {
        data: q.Merge(input, {
          profile: SelectRef(q.Var('profile')),
          timestamp: ToTimestamp(input.timestamp),
        }),
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
}
