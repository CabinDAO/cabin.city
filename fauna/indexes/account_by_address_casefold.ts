import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const accountByAddressCasefold: IndexResource = {
  name: 'account_by_address_casefold',
  source: {
    collection: q.Collection('Account'),
    fields: {
      addressCasefold: q.Query(
        q.Lambda(
          'accountDoc',
          q.Casefold(q.Select(['data', 'address'], q.Var('accountDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'addressCasefold',
    },
  ],
  unique: true,
}

export default accountByAddressCasefold
