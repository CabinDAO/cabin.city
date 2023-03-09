import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByCabinBalanceDesc: IndexResource = {
  name: 'profiles_sort_by_cabinBalance_desc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [
    { field: ['data', 'cabinTokenBalanceInt'], reverse: true },
    { field: ['ref'] },
  ],
}

export default profilesSortByCabinBalanceDesc
