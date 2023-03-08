import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesByLevel: IndexResource = {
  name: 'profiles_by_level',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['data', 'roles', 'level'] }],
}

export default profilesByLevel
