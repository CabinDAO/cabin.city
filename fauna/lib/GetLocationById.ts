import { ExprVal, query as q } from 'faunadb'

export const GetLocationById = (locationExpr: ExprVal) => {
  return q.Let(
    {
      locationRef: q.Ref(q.Collection('Location'), locationExpr),
    },
    q.If(q.Exists(q.Var('locationRef')), q.Get(q.Var('locationRef')), null)
  )
}
