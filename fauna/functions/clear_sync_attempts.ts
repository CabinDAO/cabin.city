import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const clearSyncAttempts: FunctionResource = {
  name: 'clear_sync_attempts',
  body: q.Query(
    q.Lambda(
      ['key'],
      q.Do(
        q.Map(
          q.Paginate(q.Match(q.Index('syncAttemptsByKey'), q.Var('key'))),
          q.Lambda('syncAttemptRef', q.Delete(q.Var('syncAttemptRef')))
        ),
        true
      )
    )
  ),
}

export default clearSyncAttempts
