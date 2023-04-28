import { Expr, query as q } from 'faunadb'

/**
 * Useful for scenarios where you may receive a `Ref` or a `Document` and want to ensure you have a `Document`.
 * @param expr A `Ref` or a `Document`
 * @returns A document
 */
export const ToDoc = (expr: Expr) => q.If(q.IsRef(expr), q.Get(expr), expr)
