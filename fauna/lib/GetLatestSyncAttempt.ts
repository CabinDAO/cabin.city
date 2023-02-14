import { query as q } from 'faunadb'

export const GetLatestSyncAttempt = (key: string, status: string) => {
  return q.Let(
    {
      attempts: q.Paginate(
        q.Match(q.Index('block_sync_attempts_by_key_and_status'), key, status)
      ),
      latestAttempt: q.If(
        q.IsNonEmpty(q.Var('attempts')),
        q.Get(q.Select(1, q.Select(0, q.Var('attempts')))),
        null
      ),
    },
    q.Var('latestAttempt')
  )
}
