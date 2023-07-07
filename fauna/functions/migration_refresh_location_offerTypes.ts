import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { UpdateLocationOfferTypes } from '../lib/UpdateLocationOfferTypes'

const migration_refresh_location_offerTypes: FunctionResource = {
  name: 'migration_refresh_location_offerTypes',
  body: q.Query(
    q.Lambda(
      [],
      q.Map(
        q.Paginate(q.Documents(q.Collection('Location')), {
          size: 9999,
        }),
        q.Lambda('locationDoc', UpdateLocationOfferTypes(q.Var('locationDoc')))
      )
    )
  ),
}

export default migration_refresh_location_offerTypes
