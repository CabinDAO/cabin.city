import { Expr, ExprVal, query as q } from 'faunadb'
import { IsNullOrEmpty } from './IsNullOrEmpty'

export const Coalesce = (expr: Expr, defaultValue: ExprVal) => {
  return q.If(IsNullOrEmpty(expr), defaultValue, expr)
}
