import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { GetOffersMatch } from '../lib/GetOffersMatch'

const offersCount: FunctionResource = {
  name: 'offers_count',
  body: q.Query(
    q.Lambda(
      ['input'],
      q.If(
        q.IsNull(q.Var('input')),
        q.Count(q.Documents(q.Collection('Offer'))),
        q.Count(GetOffersMatch(q.Var('input')))
      )
    )
  ),
}

export default offersCount
