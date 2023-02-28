import { ExprVal, query as q } from 'faunadb'
import { RefFromSet } from './RefFromSet'

export const AccountRefByAddress = (addressExpr: ExprVal) => {
  return RefFromSet(
    q.Match(q.Index('account_by_address_casefold'), q.Casefold(addressExpr))
  )
}
