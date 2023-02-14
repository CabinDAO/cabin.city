import { ExprVal, query as q } from 'faunadb'
import { GetAccountByAddress } from './GetAccountByAddress'

export const GetProfileByAddress = (addressExpr: ExprVal) => {
  return q.Let(
    {
      account: GetAccountByAddress(addressExpr),
      profileRef: q.Match(
        q.Index('account_profile_by_account'),
        q.Select(['ref'], q.Var('account'))
      ),
    },
    q.If(q.IsEmpty(q.Var('profileRef')), null, q.Get(q.Var('profileRef')))
  )
}
