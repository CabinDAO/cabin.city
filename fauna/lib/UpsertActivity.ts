import { Expr, ExprVal, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { ActivityType, ProfileRole } from '../../generated/graphql'
import { RefFromSet } from './RefFromSet'
import { ToTimestamp } from './ToTimestamp'

export interface UpsertActivityInput {
  key: string | Expr
  timestamp: string | Expr // String in epoch seconds or equivalent expression
  type: ActivityType
  transactionId?: string
  blockNumber?: string
  metadata?: UpsertActivityMetadataInput
  text?: string | Expr
}

interface UpsertActivityMetadataInput {
  badge?: ExprVal
  profileRole?: ProfileRole | null
  citizenshipTokenId?: string | null
}

export const UpsertActivity = (profile: Expr, input: UpsertActivityInput) => {
  return q.If(
    q.IsNull(profile),
    null,
    q.Let(
      {
        existingActivitySet: q.Match(q.Index('unique_Activity_key'), input.key),
      },
      q.Let(
        {
          data: q.Merge(input, {
            profile: SelectRef(profile),
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
  )
}
