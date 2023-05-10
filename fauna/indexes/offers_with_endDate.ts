import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const offersWithEndDate: IndexResource = {
  name: 'offers_with_endDate',
  source: {
    collection: q.Collection('Offer'),
  },
  values: [{ field: ['data', 'endDate'] }, { field: ['ref'] }],
}

export default offersWithEndDate
