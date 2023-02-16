import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { UpsertAccount } from '../lib/UpsertAccount'
import { SafeString } from '../lib/SafeString'
import { ActivityType } from '../../generated/graphql'
import { UpsertActivity } from '../lib/UpsertActivity'

const createProfile: FunctionResource = {
  name: 'create_profile',
  body: q.Query(
    q.Lambda(
      ['data'],
      q.Let(
        {
          account: UpsertAccount(q.Select('address', q.Var('data'))),
          profile: q.Create(q.Collection('Profile'), {
            data: {
              account: q.Select('ref', q.Var('account')),
              createdAt: q.Now(),
              name: SafeString(q.Select('name', q.Var('data'))),
              email: SafeString(q.Select('email', q.Var('data'))),
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
    )
  ),
}

export default createProfile
