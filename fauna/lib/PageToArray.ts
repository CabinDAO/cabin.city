import { Expr, query as q } from 'faunadb'

export function PageToArray(page: Expr): Expr {
  return q.Select(['data'], page)
}
