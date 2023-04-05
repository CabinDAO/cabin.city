import { ExprVal, query as q } from 'faunadb'
import { RefFromSet } from './RefFromSet'

export const AccountRefByAddress = (addressExpr: ExprVal) => {
  return q.Let(
    {
      match: q.Match(
        q.Index('account_by_address_casefold'),
        q.Casefold(addressExpr)
      ),
    },
    q.If(q.IsEmpty(q.Var('match')), null, RefFromSet(q.Var('match')))
  )
}
