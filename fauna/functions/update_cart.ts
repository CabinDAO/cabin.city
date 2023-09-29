import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { UpdateCart } from '../lib/UpdateCart'

const updateCart: FunctionResource = {
  name: 'update_cart',
  body: q.Query(
    q.Lambda(
      ['id', 'data'],
      UpdateCart(q.Var('id'), q.Var('data'), q.CurrentIdentity())
    )
  ),
}

export default updateCart
