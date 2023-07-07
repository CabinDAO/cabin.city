import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const locationsByOfferTypes: IndexResource = {
  name: 'locations_by_offerTypes',
  source: {
    collection: q.Collection('Location'),
    fields: {
      offerTypes: q.Query(
        q.Lambda(
          'locationDoc',
          q.Map(
            q.Select(['data', 'offerTypes'], q.Var('locationDoc'), []),
            q.Lambda('offerType', q.Var('offerType'))
          )
        )
      ),
      isPublished: q.Query(
        q.Lambda(
          'locationDoc',
          q.Not(
            q.IsNull(q.Select(['data', 'publishedAt'], q.Var('locationDoc')))
          )
        )
      ),
    },
  },
  terms: [
    {
      binding: 'offerTypes',
    },
    {
      binding: 'isPublished',
    },
  ],
  values: [{ field: ['data', 'voteCount'], reverse: true }, { field: ['ref'] }],
}

export default locationsByOfferTypes
