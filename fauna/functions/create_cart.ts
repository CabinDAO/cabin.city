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
          price: q.Select(['price'], q.Var('input')),

          profileRef: q.Ref(q.Collection('Profile'), q.Var('profileId')),
          offerRef: q.Ref(q.Collection('Offer'), q.Var('offerId')),
          offer: q.Get(q.Var('offerRef')),
          lodgingTypeRef: q.Ref(
            q.Collection('LodgingType'),
            q.Var('lodgingTypeId')
          ),
          lodgingType: q.Get(q.Var('lodgingTypeRef')),
          cartRef: q.Create(q.Collection('Cart'), {
            data: {
              profile: q.Var('profileRef'),
              offer: q.Var('offerRef'),
              lodgingType: q.Var('lodgingTypeRef'),
              amount: q.Var('price'),
            },
          }),
        },
        q.Var('cartRef')
      )
    )
  ),
}

export default createCart
