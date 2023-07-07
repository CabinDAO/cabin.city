import { Expr, query as q } from 'faunadb'
import { ToDoc } from './ToDoc'
import { ToRef } from './ToRef'
import { PageToArray } from './PageToArray'

/**
 * Updates the offerTypes on the location to be the unique offerTypes of all offers for the location.
 * @param locationExpr A `Ref` or a `Document` for a Location
 * @returns Document update metadata
 */
export const UpdateLocationOfferTypes = (locationExpr: Expr) => {
  return q.Let(
    {
      location: ToDoc(locationExpr),
      locationRef: ToRef(locationExpr),
      offers: q.Map(
        q.Paginate(
          q.Match(q.Index('location_offers_by_location'), q.Var('locationRef'))
        ),
        q.Lambda('offer', q.Get(q.Var('offer')))
      ),
      uniqueOfferTypes: q.Distinct(
        q.Map(
          q.Var('offers'),
          q.Lambda('offer', q.Select(['data', 'offerType'], q.Var('offer')))
        )
      ),
      uniqueOfferTypesArray: PageToArray(q.Var('uniqueOfferTypes')),
    },
    q.Update(q.Var('locationRef'), {
      data: {
        offerTypes: q.Var('uniqueOfferTypesArray'),
      },
    })
  )
}
