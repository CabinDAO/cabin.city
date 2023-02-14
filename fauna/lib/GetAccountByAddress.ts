import { ExprVal, query as q } from 'faunadb'

export const GetAccountByAddress = (addressExpr: ExprVal) => {
  return q.Let(
    {
      accountRef: q.Match(
        q.Index('account_by_address_casefold'),
        q.Casefold(addressExpr)
      ),
    },
    q.If(q.Exists(q.Var('accountRef')), q.Get(q.Var('accountRef')), null)
  )
}
