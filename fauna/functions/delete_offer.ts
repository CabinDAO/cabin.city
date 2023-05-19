import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const deleteOffer: FunctionResource = {
  name: 'delete_offer',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          offerRef: q.Ref(q.Collection('Offer'), q.Var('id')),
          offer: q.Get(q.Var('offerRef')),
          locationRef: q.Select(['data', 'location'], q.Var('offer')),
          location: q.Get(q.Var('locationRef')),
        },
        q.Do(
          // Decrement the offer count on the location
          q.Update(q.Var('locationRef'), {
            data: {
              offerCount: q.Subtract(
                q.Select(['data', 'offerCount'], q.Var('location')),
                1
              ),
            },
          }),

          q.Delete(q.Var('offerRef'))
        )
      )
    )
  ),
}

export default deleteOffer
