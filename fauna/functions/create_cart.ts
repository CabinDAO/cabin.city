import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaymentStatus } from '../../generated/graphql'

const createCart: FunctionResource = {
  name: 'create_cart',
  body: q.Query(
    q.Lambda(
      ['input'],
      q.Let(
        {
          profileId: q.Select(['profileId'], q.Var('input')),
          offerId: q.Select(['offerId'], q.Var('input')),
          lodgingTypeId: q.Select(['lodgingTypeId'], q.Var('input')),

          profileRef: q.Ref(q.Collection('Profile'), q.Var('profileId')),
          offerRef: q.Ref(q.Collection('Offer'), q.Var('offerId')),
          lodgingTypeRef: q.Ref(
            q.Collection('LodgingType'),
            q.Var('lodgingTypeId')
          ),

          isMe: q.Equals(q.CurrentIdentity(), q.Var('profileRef')),

          priceCents: q.Select(
            ['data', 'priceCents'],
            q.Get(q.Var('lodgingTypeRef'))
          ),
        },
        q.If(
          q.Var('isMe'),
          q.Create(q.Collection('Cart'), {
            data: {
              profile: q.Var('profileRef'),
              offer: q.Var('offerRef'),
              lodgingType: q.Var('lodgingTypeRef'),
              amountCents: q.Var('priceCents'),
              paymentStatus: PaymentStatus.Pending,
            },
          }),
          q.Abort('Not authorized. You can only edit your own cart')
        )
      )
    )
  ),
}

export default createCart
