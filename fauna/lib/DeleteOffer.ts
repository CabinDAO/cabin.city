import { Expr, query as q } from 'faunadb'
import { ToDoc } from './ToDoc'
import { ToRef } from './ToRef'
import { UpdateLocationOfferTypes } from './UpdateLocationOfferTypes'

export const DeleteOffer = (offerExpr: Expr, profileExpr: Expr) => {
  return q.Let(
    {
      profile: ToDoc(profileExpr),
      profileRef: ToRef(profileExpr),
      offer: ToDoc(offerExpr),
      offerRef: ToRef(offerExpr),
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

      // Delete activities associated with the offer
      q.Map(
        q.Paginate(
          q.Match(q.Index('activities_by_profile'), q.Var('profileRef')),
          {
            size: 100000,
          }
        ),
        q.Lambda(
          'value',
          q.Let(
            {
              activityRef: q.Select(1, q.Var('value')),
              activityOfferRef: q.Select(
                ['data', 'metadata', 'offer'],
                q.Get(q.Var('activityRef')),
                null
              ),
            },
            q.If(
              q.Equals(q.Var('activityOfferRef'), q.Var('offerRef')),
              q.Delete(q.Var('activityRef')),
              null
            )
          )
        )
      ),

      // Delete the offer
      q.Delete(q.Var('offerRef')),

      // Update the offerTypes on the location
      UpdateLocationOfferTypes(q.Var('locationRef')),

      // Return the offer
      q.Var('offer')
    )
  )
}
