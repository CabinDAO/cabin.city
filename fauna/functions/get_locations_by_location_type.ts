import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedQuery } from '../lib/PaginatedQuery'

const IS_PUBLISHED = true

const getLocationsByLocationType: FunctionResource = {
  name: 'get_locations_by_location_type',
  body: PaginatedQuery(
    ['locationType'],
    q.Match(
      q.Index('locations_by_location_type'),
      q.Var('locationType'),
      IS_PUBLISHED
    ),
    q.Select(1, q.Var('value')) // Select the 2nd element in the index (the ref)
  ),
}

export default getLocationsByLocationType
