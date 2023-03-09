import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByBadgeCountAsc: IndexResource = {
  name: 'profiles_sort_by_badgeCount_asc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [{ field: ['data', 'badgeCount'] }, { field: ['ref'] }],
}

export default profilesSortByBadgeCountAsc
