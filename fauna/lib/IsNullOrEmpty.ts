import { Expr, query as q } from 'faunadb'

export const IsNullOrEmpty = (expr: Expr) => {
  return q.If(q.IsArray(expr), q.IsEmpty(expr), q.IsNull(expr))
}
