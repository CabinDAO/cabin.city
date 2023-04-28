import { Expr, query as q } from 'faunadb'

/**
 * Useful for scenarios where you may receive a `Ref` or a `Document` and want to ensure you have a `Ref`.
 * @param expr A `Ref` or a `Document`
 * @returns A Ref
 */
export const ToRef = (expr: Expr) =>
  q.If(q.IsRef(expr), expr, q.Select('ref', expr))
