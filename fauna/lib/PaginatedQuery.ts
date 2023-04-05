import { Expr, query as q } from 'faunadb'
import { PaginatedMatch } from './PaginatedMatch'

export function PaginatedQuery(
  args: string[] = [],
  match: Expr,
  extract: Expr = q.Var('value')
): Expr {
  return q.Query(
    q.Lambda(
      [...args, 'size', 'after', 'before'],
      PaginatedMatch(
        match,
        q.Var('size'),
        q.Var('after'),
        q.Var('before'),
        extract
      )
    )
  )
}
