import { Expr, query as q } from 'faunadb'

export const RefFromSet = (setExpr: Expr) => {
  return q.Let(
    {
      setAsArray: q.Paginate(setExpr),
    },
    q.Select([0], q.Var('setAsArray'))
  )
}
