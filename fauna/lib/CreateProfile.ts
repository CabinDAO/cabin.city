import { Expr, query as q } from 'faunadb'
import { ActivityType } from '../../generated/graphql'
import { SafeString } from './SafeString'
import { UpsertAccount } from './UpsertAccount'
import { UpsertActivity } from './UpsertActivity'

export interface CreateProfileInput {
  address: string | Expr
  name: string | Expr
  email: string | Expr
}

export const CreateProfile = (input: CreateProfileInput) => {
  return q.Let(
    {
      account: UpsertAccount(input.address),
      profile: q.Create(q.Collection('Profile'), {
        data: {
          account: q.Select('ref', q.Var('account')),
          createdAt: q.Now(),
          name: SafeString(input.name),
          email: SafeString(input.email),
          roles: [],
          contactFields: [],
        },
      }),
      activity: UpsertActivity(q.Var('profile'), {
        key: q.Format(
          'ProfileCreated|%s',
          q.Select(['ref', 'id'], q.Var('profile'))
        ),
        timestamp: q.Select(['data', 'createdAt'], q.Var('profile')),
        type: ActivityType.ProfileCreated,
      }),
    },
    q.Var('profile')
  )
}
