import { GetAccountByAddress } from '@/fauna/lib/GetAccountByAddress'
import { query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const getCabinTokenBalances = async (
  addresses: string[]
): Promise<{ address: string; balance: string }[]> => {
  return faunaServerClient.query(
    addresses.map((address) =>
      q.Let(
        {
          account: GetAccountByAddress(address),
          balance: q.If(
            q.IsNull(q.Var('account')),
            null,
            q.Select(['data', 'cabinTokenBalance'], q.Var('account'))
          ),
        },
        {
          address: address,
          balance: q.Var('balance'),
        }
      )
    )
  )
}
