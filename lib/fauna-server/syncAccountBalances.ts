import { CompleteSyncAttempt } from '@/fauna/lib/CompleteSyncAttempt'
import { UpsertAccount } from '@/fauna/lib/UpsertAccount'
import { query as q, Expr } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const syncAccountBalances = async (
  syncAttemptRef: Expr,
  newAccountBalances: { address: string; balance: string }[]
) => {
  return faunaServerClient.query(
    q.Do(
      newAccountBalances.map((accountBalance) =>
        q.Let(
          {
            account: UpsertAccount(accountBalance.address),
          },
          q.Update(q.Select('ref', q.Var('account')), {
            data: {
              cabinTokenBalance: accountBalance.balance,
            },
          })
        )
      ),
      CompleteSyncAttempt(syncAttemptRef)
    )
  )
}
