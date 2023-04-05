import { Expr, query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const updateSyncAttemptStatus = async (ref: Expr, status: string) => {
  return faunaServerClient.query(
    q.Let(
      {
        syncAttempt: q.Get(ref),
      },
      q.If(
        // If the status is already 'Successful', don't update it
        // This is likely caused by a duplicate transaction reverting
        q.Not(q.Equals(status, 'Successful')),
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
        ),
        null
      )
    )
  )
}
