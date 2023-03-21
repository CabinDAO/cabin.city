import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { TruncateBigNumber } from './TruncateBigNumber'

export const SyncProfileCabinTokenBalance = (
  profileExpr: Expr,
  balance: string
) => {
  return q.If(
    q.Not(q.IsNull(profileExpr)),
    // If there is a profile and the account has a cabinTokenBalance, update the profile
    q.Update(SelectRef(profileExpr), {
      data: {
        cabinTokenBalanceInt: TruncateBigNumber(balance),
      },
    }),
    // Otherwise, do nothing
    null
  )
}
