import { Expr, ExprArg, ExprVal, query as q } from 'faunadb'
import { ToRef } from './ToRef'
import { PaymentStatus } from '../../generated/graphql'

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
    },
    q.If(
      q.Not(q.Var('isMe')),
      q.Abort('Not authorized. You can only edit your own cart'),
      q.Let(
        {
          // Merge the new data with the existing data
          mergedData: q.Merge(q.Select(['data'], q.Var('cart')), data),
          updatedCart: q.Update(q.Var('cartRef'), {
            data: q.Var('mergedData'),
          }),

          lodgingTypeRef: q.Select(['data', 'lodgingType'], q.Var('cart')),

          oldPaymentStatus: q.Select(['data', 'paymentStatus'], q.Var('cart')),
          newPaymentStatus: q.Select('paymentStatus', q.Var('mergedData')),

          // going from unpaid to paid
          spotTaken: q.And(
            q.Not(q.Equals(q.Var('oldPaymentStatus'), PaymentStatus.Paid)),
            q.Equals(q.Var('newPaymentStatus'), PaymentStatus.Paid)
          ),
          // going from paid to unpaid
          spotUntaken: q.And(
            q.Equals(q.Var('oldPaymentStatus'), PaymentStatus.Paid),
            q.Not(q.Equals(q.Var('newPaymentStatus'), PaymentStatus.Paid))
          ),
        },
        q.Do(
          q.If(
            q.Var('spotTaken'),
            q.Update(q.Var('lodgingTypeRef'), {
              data: {
                spotsTaken: q.Add(
                  q.Select(
                    ['data', 'spotsTaken'],
                    q.Get(q.Var('lodgingTypeRef'))
                  ),
                  1
                ),
              },
            }),
            null
          ),
          q.If(
            q.Var('spotUntaken'),
            q.Update(q.Var('lodgingTypeRef'), {
              data: {
                spotsTaken: q.Subtract(
                  q.Select(
                    ['data', 'spotsTaken'],
                    q.Get(q.Var('lodgingTypeRef'))
                  ),
                  1
                ),
              },
            }),
            null
          ),
          q.Var('updatedCart')
        )
      )
    )
  )
}
