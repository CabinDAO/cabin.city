import { Expr, query as q } from 'faunadb'

export function PaginatedMatch(
  match: Expr,
  size: Expr,
  after: Expr,
  before: Expr,
  extract: Expr = q.Var('value')
): Expr {
  return q.Let(
    {
      match,
      page: q.If(
        q.IsNull(before),
        q.If(
          q.IsNull(after),
          q.Paginate(match, { size }),
          q.Paginate(match, {
            size,
            after: after,
          })
        ),
        q.Paginate(match, {
          size,
          before: before,
        })
      ),
    },
    q.Map(q.Var('page'), q.Lambda('value', q.Get(extract)))
  )
}
