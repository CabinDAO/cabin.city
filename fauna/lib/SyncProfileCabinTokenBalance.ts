import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { TruncateBigNumber } from './TruncateBigNumber'

export const SyncProfileCabinTokenbalance = (
  profileExpr: Expr,
  accountExpr: Expr
) => {
  return q.If(
    q.And(
      q.Not(q.IsNull(profileExpr)),
      q.ContainsPath(['data', 'cabinTokenBalance'], accountExpr)
    ),
    // If there is a profile and the account has a cabinTokenBalance, update the profile
    q.Let(
      {
        cabinTokenBalance: q.Select(['data', 'cabinTokenBalance'], accountExpr),
      },
      q.Update(SelectRef(profileExpr), {
        data: {
          cabinTokenBalanceInt: TruncateBigNumber(q.Var('cabinTokenBalance')),
        },
      })
    ),
    // Otherwise, do nothing
    null
  )
}
