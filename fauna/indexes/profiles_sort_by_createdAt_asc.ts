import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByCreatedAtAsc: IndexResource = {
  name: 'profiles_sort_by_createdAt_asc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [{ field: ['data', 'createdAt'] }, { field: ['ref'] }],
}

export default profilesSortByCreatedAtAsc
