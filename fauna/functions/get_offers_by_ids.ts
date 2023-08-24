import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const getOffersByIds: FunctionResource = {
  name: 'get_offers_by_ids',
  body: q.Query(
    q.Lambda(
      ['ids'],
      q.Map(
        q.Var('ids'),
        q.Lambda('id', q.Get(q.Ref(q.Collection('Offer'), q.Var('id'))))
      )
    )
  ),
}

export default getOffersByIds
