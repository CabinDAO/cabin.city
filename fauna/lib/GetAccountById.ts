import { ExprVal, query as q } from 'faunadb'

export const GetAccountById = (accountExpr: ExprVal) => {
  return q.Let(
    {
      accountRef: q.Ref(q.Collection('Account'), accountExpr),
    },
    q.If(q.Exists(q.Var('accountRef')), q.Get(q.Var('accountRef')), null)
  )
}
