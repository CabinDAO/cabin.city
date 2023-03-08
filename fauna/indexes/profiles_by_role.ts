import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesByRole: IndexResource = {
  name: 'profiles_by_role',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['data', 'roles', 'role'] }],
}

export default profilesByRole
