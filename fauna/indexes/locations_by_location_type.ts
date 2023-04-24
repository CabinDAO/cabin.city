import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const locationsByLocationType: IndexResource = {
  name: 'locations_by_location_type',
  source: {
    collection: q.Collection('Location'),
    fields: {
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
    { field: ['data', 'locationType'] },
    {
      binding: 'isPublished',
    },
  ],
  values: [{ field: ['data', 'voteCount'], reverse: true }, { field: ['ref'] }],
}

export default locationsByLocationType
