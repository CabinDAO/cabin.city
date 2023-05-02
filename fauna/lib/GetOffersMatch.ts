import { Expr, ExprVal, query as q } from 'faunadb'

// Returns a set reference that can be used for both paginated queries (get_offers) and count queries (offers_count)
export const GetOffersMatch = (input: ExprVal) => {
  return q.Let(
    {
      offerTypes: q.Select(['offerTypes'], input, []),
    },
    q.Intersection(OffersByOfferType(q.Var('offerTypes')))
  )
}

const OffersByOfferType = (offerTypes: Expr) =>
  q.Union(
    q.Map(
      offerTypes,
      q.Lambda(
        'offerType',
        // Range filters out inactive (endDate has passed) offers
        q.Range(
          q.Match(q.Index('offers_by_offerType'), q.Var('offerType')),
          q.Now(),
          []
        )
      )
    )
  )
