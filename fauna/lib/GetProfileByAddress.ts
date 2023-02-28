import { ExprVal, query as q } from 'faunadb'
import { AccountRefByAddress } from './AccountRefByAddress'
import { GetProfileByAccountRef } from './GetProfileByAccountRef'

export const GetProfileByAddress = (addressExpr: ExprVal) => {
  return q.Let(
    {
      accountRef: AccountRefByAddress(addressExpr),
    },
    GetProfileByAccountRef(q.Var('accountRef'))
  )
}
