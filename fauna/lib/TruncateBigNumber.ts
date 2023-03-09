import { ExprVal, query as q } from 'faunadb'

/**
 * Converts a string value to a Number with 18 decimals truncated
 * @param val String with 18 decimal point precision
 * @returns A Number
 */
export const TruncateBigNumber = (val: ExprVal) => {
  return q.Let(
    {
      diff: q.Subtract(q.Length(val), 18),
    },

    q.If(
      q.GT(q.Var('diff'), 0),
      // If the string is longer than 18 characters, truncate it
      q.ToNumber(q.SubString(val, 0, q.Var('diff'))),
      // Otherwise, return 0
      0
    )
  )
}
