import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const profilesByCitizenshipStatusCount: FunctionResource = {
  name: 'profiles_by_citizenship_status_count',
  body: q.Query(
    q.Lambda(
      ['status'],
      q.Let(
        {
          count: q.Count(
            q.Match(q.Index('profiles_by_citizenship_status'), q.Var('status'))
          ),
        },
        q.Var('count')
      )
    )
  ),
}

export default profilesByCitizenshipStatusCount
