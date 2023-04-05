import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByCreatedAtDesc: IndexResource = {
  name: 'profiles_sort_by_createdAt_desc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [{ field: ['data', 'createdAt'], reverse: true }, { field: ['ref'] }],
}

export default profilesSortByCreatedAtDesc
