import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

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

          price: q.Select(['data', 'price'], q.Get(q.Var('lodgingTypeRef'))),
        },
        q.If(
          q.Var('isMe'),
          q.Create(q.Collection('Cart'), {
            data: {
              profile: q.Var('profileRef'),
              offer: q.Var('offerRef'),
              lodgingType: q.Var('lodgingTypeRef'),
              amount: q.Var('price'),
            },
          }),
          q.Abort('Not authorized. You can only edit your own cart')
        )
      )
    )
  ),
}

export default createCart
