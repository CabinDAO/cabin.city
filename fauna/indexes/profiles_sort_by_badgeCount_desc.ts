import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesSortByBadgeCountDesc: IndexResource = {
  name: 'profiles_sort_by_badgeCount_desc',
  source: {
    collection: q.Collection('Profile'),
  },
  terms: [{ field: ['ref'] }],
  values: [
    { field: ['data', 'badgeCount'], reverse: true },
    { field: ['ref'] },
  ],
}

export default profilesSortByBadgeCountDesc
