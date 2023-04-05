import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { GetProfilesMatch } from '../lib/GetProfilesMatch'

const profilesCount: FunctionResource = {
  name: 'profiles_count',
  body: q.Query(
    q.Lambda(
      ['input'],
      q.If(
        q.IsNull(q.Var('input')),
        q.Count(q.Documents(q.Collection('Profile'))),
        q.Count(GetProfilesMatch(q.Var('input')))
      )
    )
  ),
}

export default profilesCount
