import { ExprVal, query as q } from 'faunadb'

/**
 * Asserts a string is not null or empty
 * @param str String or expression that evaluates to a string
 * @returns A valid string
 */
export const SafeString = (str: ExprVal) => {
  return q.If(
    q.Or(q.IsNull(str), q.Equals(q.Length(str), 0)),
    q.Abort('String is null or empty'),
    str
  )
}
