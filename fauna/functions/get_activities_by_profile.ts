import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedMatch } from '../lib/PaginatedMatch'
import { ActivityPageToActivityItems } from '../lib/ActivityPageToActivityItems'

const getActivitiesByProfile: FunctionResource = {
  name: 'get_activities_by_profile',
  body: q.Query(
    q.Lambda(
      ['profileId', 'size', 'after', 'before'],
      q.Let(
        {
          page: PaginatedMatch(
            q.Match(
              q.Index('activities_by_profile'),
              q.Ref(q.Collection('Profile'), q.Var('profileId'))
            ),
            q.Var('size'),
            q.Var('after'),
            q.Var('before'),
            // Select the 2nd element in the index (the ref)
            q.Select(1, q.Var('value'))
          ),
        },
        ActivityPageToActivityItems(q.Var('page'))
      )
    )
  ),
}

export default getActivitiesByProfile
