import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByCabinBalanceAsc: IndexResource = {
  name: 'profiles_sort_by_cabinBalance_asc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [{ field: ['data', 'cabinTokenBalanceInt'] }, { field: ['ref'] }],
}

export default profilesSortByCabinBalanceAsc
