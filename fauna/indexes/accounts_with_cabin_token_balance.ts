import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const accountsWithCabinTokenBalance: IndexResource = {
  name: 'accounts_with_cabin_token_balance',
  source: {
    collection: q.Collection('Account'),
    fields: {
      has_cabin_token_balance: q.Query(
        q.Lambda(
          'account',
          // Has cabin token if cabinTokenBalance is present and not zero
          q.And(
            q.ContainsPath(['data', 'cabinTokenBalance'], q.Var('account')),
            q.Not(
              q.Equals(
                q.Select(['data', 'cabinTokenBalance'], q.Var('account')),
                '0'
              )
            )
          )
        )
      ),
    },
  },
  terms: [{ binding: 'has_cabin_token_balance' }],
}

export default accountsWithCabinTokenBalance
