import { ExprVal, query as q } from 'faunadb'

export const GetHatByHatId = (hatIdExpr: ExprVal) => {
  return q.Let(
    {
      hatRef: q.Match(q.Index('unique_Hat_hatId'), hatIdExpr),
    },
    q.If(q.Exists(q.Var('hatRef')), q.Get(q.Var('hatRef')), null)
  )
}
