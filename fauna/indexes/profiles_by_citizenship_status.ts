import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesByCitizenshipStatus: IndexResource = {
  name: 'profiles_by_citizenship_status',
  source: q.Collection('Profile'),
  terms: [{ field: ['data', 'citizenshipStatus'] }],
}

export default profilesByCitizenshipStatus
