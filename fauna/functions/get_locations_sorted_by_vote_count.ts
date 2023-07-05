import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedQuery } from '../lib/PaginatedQuery'

const IS_PUBLISHED = true

const getLocationsSortedByVoteCount: FunctionResource = {
  name: 'get_locations_sorted_by_vote_count',
  body: PaginatedQuery(
    [],
    q.Match(q.Index('locations_sorted_by_vote_count_desc'), IS_PUBLISHED),
    q.Select(1, q.Var('value')) // Select the 2nd element in the index (the ref)
  ),
}

export default getLocationsSortedByVoteCount
