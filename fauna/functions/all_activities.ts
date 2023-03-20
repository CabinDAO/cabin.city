import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedMatch } from '../lib/PaginatedMatch'
import { ActivityPageToActivityItems } from '../lib/ActivityPageToActivityItems'

const allActivities: FunctionResource = {
  name: 'all_activities',
  body: q.Query(
    q.Lambda(
      ['size', 'after', 'before'],
      q.Let(
        {
          page: PaginatedMatch(
            q.Match(q.Index('activities_sorted_by_timestamp')),
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

export default allActivities
