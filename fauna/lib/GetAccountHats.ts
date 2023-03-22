import { query as q } from 'faunadb'
import { AccountRefByAddress } from './AccountRefByAddress'

export const GetAccountHats = (address: string) => {
  return q.Let(
    {
      accountRef: AccountRefByAddress(address),
    },
    q.If(
      q.IsNull(q.Var('accountRef')),
      [],
      q.Map(
        q.Paginate(
          q.Match(q.Index('account_hats_by_account'), q.Var('accountRef'))
        ),
        q.Lambda('hat', q.Get(q.Var('hat')))
      )
    )
  )
}
