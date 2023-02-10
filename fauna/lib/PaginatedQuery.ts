import { Expr, query as q } from 'faunadb'

export function PaginatedQuery(
  args: string[] = [],
  match: Expr,
  extract: Expr = q.Var('value')
): Expr {
  return q.Query(
    q.Lambda(
      [...args, 'size', 'after', 'before'],
      q.Let(
        {
          match,
          page: q.If(
            q.IsNull(q.Var('before')),
            q.If(
              q.IsNull(q.Var('after')),
              q.Paginate(q.Var('match'), { size: q.Var('size') }),
              q.Paginate(q.Var('match'), {
                size: q.Var('size'),
                after: q.Var('after'),
              })
            ),
            q.Paginate(q.Var('match'), {
              size: q.Var('size'),
              before: q.Var('before'),
            })
          ),
        },
        q.Map(q.Var('page'), q.Lambda('value', q.Get(extract)))
      )
    )
  )
}
