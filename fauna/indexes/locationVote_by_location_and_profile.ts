import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const locationVoteByLocationAndProfile: IndexResource = {
  name: 'locationVote_by_location_and_profile',
  source: {
    collection: q.Collection('LocationVote'),
  },
  terms: [{ field: ['data', 'location'] }, { field: ['data', 'profile'] }],
  values: [{ field: ['ref'] }],
}

export default locationVoteByLocationAndProfile
