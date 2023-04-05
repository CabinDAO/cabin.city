import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const tokenHoldersCount: FunctionResource = {
  name: 'token_holders_count',
  body: q.Query(
    q.Lambda(
      [],
      q.Let(
        {
          count: q.Count(
            q.Match(q.Index('accounts_with_cabin_token_balance'), true)
          ),
        },
        q.Var('count')
      )
    )
  ),
}

export default tokenHoldersCount
