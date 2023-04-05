import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const accountByAddress: FunctionResource = {
  name: 'account_by_address',
  body: q.Query(
    q.Lambda(
      ['address'],
      q.Get(
        q.Match(
          q.Index('account_by_address_casefold'),
          q.Casefold(q.Var('address'))
        )
      )
    )
  ),
}

export default accountByAddress
