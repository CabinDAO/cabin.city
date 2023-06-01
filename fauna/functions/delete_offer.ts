import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { DeleteOffer } from '../lib/DeleteOffer'

const deleteOffer: FunctionResource = {
  name: 'delete_offer',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          profileRef: q.CurrentIdentity(),
          offerRef: q.Ref(q.Collection('Offer'), q.Var('id')),
        },
        DeleteOffer(q.Var('offerRef'), q.Var('profileRef'))
      )
    )
  ),
}

export default deleteOffer
