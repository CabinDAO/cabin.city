import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { UpsertActivity } from '../lib/UpsertActivity'
import { ActivityType } from '../../generated/graphql'

const createTextActivity: FunctionResource = {
  name: 'create_text_activity',
  body: q.Query(
    q.Lambda(
      ['text'],
      q.Let(
        {
          profileRef: q.CurrentIdentity(),
          profile: q.Get(q.Var('profileRef')),
          now: q.Now(),
        },
        UpsertActivity(q.Var('profile'), {
          key: q.Format(
            'Text|%s',
            q.Concat(
              [
                q.Select(['ref', 'id'], q.Var('profile')),
                q.Format('%tQ', q.Var('now')),
              ],
              '|'
            )
          ),
          text: q.Var('text'),
          timestamp: q.Var('now'),
          type: ActivityType.Text,
        })
      )
    )
  ),
}

export default createTextActivity
