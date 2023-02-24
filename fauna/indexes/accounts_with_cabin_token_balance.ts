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
          q.ContainsPath(['data', 'cabinTokenBalance'], q.Var('account'))
        )
      ),
    },
  },
  terms: [{ binding: 'has_cabin_token_balance' }],
}

export default accountsWithCabinTokenBalance
