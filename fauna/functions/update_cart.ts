import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const updateCart: FunctionResource = {
  name: 'update_cart',
  body: q.Query(
    q.Lambda(
      ['id', 'data'],
      q.Let(
        {
          cartRef: q.Ref(q.Collection('Cart'), q.Var('id')),
          cart: q.Get(q.Var('cartRef')),
          isMe: q.Equals(
            q.CurrentIdentity(),
            q.Select(['data', 'profile'], q.Var('cart'))
          ),
          // Merge the new data with the existing data
          mergedData: q.Merge(q.Select(['data'], q.Var('cart')), q.Var('data')),
        },
        q.If(
          q.Var('isMe'),
          q.Update(q.Var('cartRef'), {
            data: q.Var('mergedData'),
          }),
          q.Abort('Not authorized. You can only edit your own cart')
        )
      )
    )
  ),
}

export default updateCart
