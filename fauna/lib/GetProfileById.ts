import { ExprVal, query as q } from 'faunadb'

export const GetProfileById = (profileExpr: ExprVal) => {
  return q.Let(
    {
      profileRef: q.Ref(q.Collection('Profile'), profileExpr),
    },
    q.If(q.Exists(q.Var('profileRef')), q.Get(q.Var('profileRef')), null)
  )
}
