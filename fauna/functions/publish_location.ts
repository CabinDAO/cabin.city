import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { UpsertActivity } from '../lib/UpsertActivity'
import { ActivityType } from '../../generated/graphql'

const publishLocation: FunctionResource = {
  name: 'publish_location',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          locationRef: q.Ref(q.Collection('Location'), q.Var('id')),
          location: q.Get(q.Var('locationRef')),
          profileRef: q.CurrentIdentity(),
          profile: q.Get(q.Var('profileRef')),
        },
        q.Do(
          q.Update(q.Var('locationRef'), {
            data: {
              publishedAt: q.Now(),
            },
          }),
          UpsertActivity(q.Var('profile'), {
            key: q.Format(
              'LocationPublished|%s',
              q.Concat(
                [
                  q.Select(['data', 'locationType'], q.Var('location')),
                  q.Select(['ref', 'id'], q.Var('location')),
                ],
                '|'
              )
            ),
            timestamp: q.Now(),
            type: ActivityType.LocationPublished,
            metadata: {
              location: q.Var('locationRef'),
            },
          }),
          q.Get(q.Var('locationRef'))
        )
      )
    )
  ),
}

export default publishLocation
