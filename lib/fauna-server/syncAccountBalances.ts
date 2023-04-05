import { CompleteSyncAttempt } from '@/fauna/lib/CompleteSyncAttempt'
import { GetProfileByAccountRef } from '@/fauna/lib/GetProfileByAccountRef'
import { SyncProfileCabinTokenBalance } from '@/fauna/lib/SyncProfileCabinTokenBalance'
import { UpsertAccount } from '@/fauna/lib/UpsertAccount'
import { query as q, Expr } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
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
            profile: GetProfileByAccountRef(SelectRef(q.Var('account'))),
          },
          q.Do(
            q.Update(q.Select('ref', q.Var('account')), {
              data: {
                cabinTokenBalance: accountBalance.balance,
              },
            }),
            SyncProfileCabinTokenBalance(
              q.Var('profile'),
              accountBalance.balance
            )
          )
        )
      ),
      CompleteSyncAttempt(syncAttemptRef)
    )
  )
}
