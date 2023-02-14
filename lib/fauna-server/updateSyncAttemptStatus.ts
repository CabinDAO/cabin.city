import { Expr, query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const updateSyncAttemptStatus = async (ref: Expr, status: string) => {
  return faunaServerClient.query(
    q.Let(
      {
        failedAttemptCount: q.If(
          q.Equals(status, 'Failed'),
          q.Add(q.Select(['data', 'failedAttemptCount'], q.Get(ref), 0), 1),
          0
        ),
      },
      q.Update(ref, {
        data: {
          status,
          failedAttemptCount: q.Var('failedAttemptCount'),
        },
      })
    )
  )
}
