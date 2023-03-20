import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const activityReactionByActivityAndProfile: IndexResource = {
  name: 'activityReaction_by_activity_and_profile',
  source: q.Collection('ActivityReaction'),
  terms: [{ field: ['data', 'activity'] }, { field: ['data', 'profile'] }],
  unique: true,
}

export default activityReactionByActivityAndProfile
