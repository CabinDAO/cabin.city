import { Expr, query as q } from 'faunadb'
import { RefFromSet } from './RefFromSet'

export const DeleteAccountHat = (accountRefExpr: Expr, hatRefExpr: Expr) => {
  return q.Let(
    {
      accountHat: q.Match(
        q.Index('account_hats_by_account_and_hat'),
        accountRefExpr,
        hatRefExpr
      ),
    },
    q.If(
      q.Not(q.IsEmpty(q.Var('accountHat'))),
      q.Delete(RefFromSet(q.Var('accountHat'))),
      null // Do nothing if account does not have the hat
    )
  )
}
