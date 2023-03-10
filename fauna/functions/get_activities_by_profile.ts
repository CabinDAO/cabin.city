import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedQuery } from '../lib/PaginatedQuery'

const getActivitiesByProfile: FunctionResource = {
  name: 'get_activities_by_profile',
  body: PaginatedQuery(
    ['profileId'],
    q.Match(
      q.Index('activities_by_profile'),
      q.Ref(q.Collection('Profile'), q.Var('profileId'))
    ),
    q.Select(1, q.Var('value')) // Select the 2nd element in the index (the ref)
  ),
}

export default getActivitiesByProfile
