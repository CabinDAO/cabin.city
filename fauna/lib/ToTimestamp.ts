import { ExprArg, ExprVal, query as q } from 'faunadb'

/**
 * Converts a value to a timestamp
 * @param val String in epoch seconds or equivalent expression
 * @returns A Timestamp
 */
export const ToTimestamp = (val: ExprVal, unit: ExprArg = 'seconds') => {
  return q.If(q.IsTimestamp(val), val, q.Epoch(q.ToNumber(val), unit))
}
