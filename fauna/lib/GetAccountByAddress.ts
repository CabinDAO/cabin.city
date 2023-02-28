import { ExprVal, query as q } from 'faunadb'
import { AccountRefByAddress } from './AccountRefByAddress'

export const GetAccountByAddress = (addressExpr: ExprVal) => {
  return q.Let(
    {
      accountRef: AccountRefByAddress(addressExpr),
    },
    q.If(q.Exists(q.Var('accountRef')), q.Get(q.Var('accountRef')), null)
  )
}
