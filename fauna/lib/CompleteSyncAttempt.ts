import { Expr, query as q } from 'faunadb'

export const CompleteSyncAttempt = (syncAttemptRef: Expr) => {
  return q.Let(
    {
      syncAttempt: q.Get(syncAttemptRef),
      syncAttemptStatus: q.Select(['data', 'status'], q.Var('syncAttempt')),
    },
    q.If(
      q.Equals(q.Var('syncAttemptStatus'), 'Successful'),
      // If the sync attempt is already successful, revert the transaction - this is a dupe
      q.Abort(
        'Sync attempt already completed. Aborting transaction since this is a duplicate.'
      ),
      q.Update(syncAttemptRef, {
        data: {
          status: 'Successful',
        },
      })
    )
  )
}
