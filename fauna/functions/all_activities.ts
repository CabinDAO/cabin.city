import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedQuery } from '../lib/PaginatedQuery'

const allActivities: FunctionResource = {
  name: 'all_activities',
  body: PaginatedQuery(
    [],
    q.Match(q.Index('activities_sorted_by_timestamp')),
    q.Select(1, q.Var('value')) // Select the 2nd element in the index (the ref)
  ),
}

export default allActivities
