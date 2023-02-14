import { ExprVal, query as q } from 'faunadb'
import { GetAccountByAddress } from './GetAccountByAddress'

export const UpsertAccount = (addressExpr: ExprVal) => {
  return q.Let(
    {
      account: GetAccountByAddress(addressExpr),
    },
    q.If(
      q.IsNull(q.Var('account')),
      q.Create(q.Collection('Account'), {
        data: {
          address: addressExpr,
        },
      }),
      q.Var('account')
    )
  )
}
