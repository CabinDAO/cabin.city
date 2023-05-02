import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const offersSortByLocationType: IndexResource = {
  name: 'offers_sort_by_locationType',
  source: {
    collection: q.Collection('Offer'),
  },
  terms: [{ field: ['ref'] }],
  values: [
    { field: ['data', 'locationType'] },
    { field: ['data', 'startDate'] },
    { field: ['ref'] },
  ],
}

export default offersSortByLocationType
