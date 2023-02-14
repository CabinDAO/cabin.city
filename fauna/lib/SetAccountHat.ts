import { Expr, query as q } from 'faunadb'
import { GetAccountHat } from './GetAccountHat'

export const SetAccountHat = (accountRefExpr: Expr, hatRefExpr: Expr) => {
  return q.Let(
    {
      accountHat: GetAccountHat(accountRefExpr, hatRefExpr),
    },
    q.If(
      q.IsEmpty(q.Var('accountHat')),
      q.Create(q.Collection('account_hats'), {
        data: {
          accountID: accountRefExpr,
          hatID: hatRefExpr,
        },
      }),
      null // Do nothing if the account already has the hat
    )
  )
}
