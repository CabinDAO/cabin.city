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
          isMe: q.Equals(
            q.CurrentIdentity(),
            q.Select('profile', q.Var('cartRef'))
          ),
        },
        q.If(
          q.Var('isMe'),
          q.Update(q.Var('cartRef'), {
            data: q.Var('data'),
          }),
          q.Abort('Not authorized. You can only edit your own cart')
        )
      )
    )
  ),
}

export default updateCart
