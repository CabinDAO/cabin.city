import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const profilesCount: FunctionResource = {
  name: 'profiles_count',
  body: q.Query(
    q.Lambda(
      [],
      q.Let(
        {
          count: q.Count(q.Documents(q.Collection('Profile'))),
        },
        q.Var('count')
      )
    )
  ),
}

export default profilesCount
