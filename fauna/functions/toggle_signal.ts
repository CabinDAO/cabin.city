import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { ActivityType, CitizenshipStatus } from '../../generated/graphql'
import { UpsertActivity } from '../lib/UpsertActivity'

const toggleSignal: FunctionResource = {
  name: 'toggle_signal',
  body: q.Query(
    q.Lambda(
      [],
      q.Let(
        {
          profileRef: q.CurrentIdentity(),
          profile: q.Get(q.Var('profileRef')),
          citizenshipStatus: q.Select(
            ['data', 'citizenshipStatus'],
            q.Var('profile'),
            null
          ),
        },
        q.Do(
          q.If(
            q.Equals(
              q.Var('citizenshipStatus'),
              CitizenshipStatus.VouchRequested
            ),
            q.Update(q.Var('profileRef'), {
              data: {
                citizenshipStatus: null,
              },
            }),
            q.If(
              q.Equals(q.Var('citizenshipStatus'), null),
              q.Do(
                q.Update(q.Var('profileRef'), {
                  data: {
                    citizenshipStatus: CitizenshipStatus.VouchRequested,
                  },
                }),
                UpsertActivity(
                  q.Var('profile'),
                  {
                    key: q.Format(
                      'VouchRequested|%s',
                      q.Select(['ref', 'id'], q.Var('profile'))
                    ),
                    timestamp: q.Now(),
                    type: ActivityType.VouchRequested,
                  },
                  true
                )
              ),
              null
            )
          ),
          q.Get(q.Var('profileRef'))
        )
      )
    )
  ),
}

export default toggleSignal
