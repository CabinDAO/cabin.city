import { Expr, query as q } from 'faunadb'

export const GetAccountHat = (accountRefExpr: Expr, hatRefExpr: Expr) => {
  return q.Match(
    q.Index('account_hats_by_account_and_hat'),
    accountRefExpr,
    hatRefExpr
  )
}
