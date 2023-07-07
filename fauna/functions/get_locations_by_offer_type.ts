import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedQuery } from '../lib/PaginatedQuery'

const IS_PUBLISHED = true

const getLocationsByOfferType: FunctionResource = {
  name: 'get_locations_by_offer_type',
  body: PaginatedQuery(
    ['offerType'],
    q.Match(
      q.Index('locations_by_offerTypes'),
      q.Var('offerType'),
      IS_PUBLISHED
    ),
    q.Select(1, q.Var('value')) // Select the 2nd element in the index (the ref)
  ),
}

export default getLocationsByOfferType
