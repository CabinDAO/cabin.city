import { Expr, ExprArg, ExprVal, query as q } from 'faunadb'
import { ToRef } from './ToRef'

// THIS IS THE REAL UpdateCart FUNCTION
// EVERYTHING ELSE IS A FUCKING ROUNDABOUT WAY TO GET HERE

export const UpdateCart = (
  cartId: ExprVal,
  data: ExprArg,
  currIdentity: Expr
) => {
  return q.Let(
    {
      cartRef: q.Ref(q.Collection('Cart'), cartId),
      cart: q.Get(q.Var('cartRef')),
      currIdRef: ToRef(currIdentity),
      isMe: q.Equals(
        q.Var('currIdRef'),
        q.Select(['data', 'profile'], q.Var('cart'))
      ),
      // Merge the new data with the existing data
      mergedData: q.Merge(q.Select(['data'], q.Var('cart')), data),
    },
    q.If(
      q.Var('isMe'),
      q.Update(q.Var('cartRef'), {
        data: q.Var('mergedData'),
      }),
      q.Abort('Not authorized. You can only edit your own cart')
    )
  )
}
