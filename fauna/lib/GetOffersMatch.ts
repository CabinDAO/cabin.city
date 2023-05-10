import { Expr, ExprVal, query as q } from 'faunadb'

// Returns a set reference that can be used for both paginated queries (get_offers) and count queries (offers_count)
export const GetOffersMatch = (input: ExprVal) => {
  return q.Let(
    {
      offerTypes: q.Select(['offerTypes'], input, []),
      profileRoleConstraints: q.Select(['profileRoleConstraints'], input, []),
      matches: q.Filter(
        [
          OffersByProfileRoleConstraints(q.Var('profileRoleConstraints')),
          OffersByOfferType(q.Var('offerTypes')),
          ActiveOffers(),
        ],
        q.Lambda('match', q.Not(q.IsNull(q.Var('match'))))
      ),
    },
    q.Intersection(q.Var('matches'))
  )
}

const OffersByOfferType = (offerTypes: Expr) =>
  q.If(
    q.IsNonEmpty(offerTypes),
    q.Union(
      q.Map(
        offerTypes,
        q.Lambda(
          'offerType',
          q.Match(q.Index('offers_by_offerType'), q.Var('offerType'))
        )
      )
    ),
    null
  )

const OffersByProfileRoleConstraints = (profileRoleConstraints: Expr) =>
  q.If(
    q.IsNonEmpty(profileRoleConstraints),
    q.Union(
      q.Map(
        profileRoleConstraints,
        q.Lambda(
          'profileRoleConstraint',
          q.Match(
            q.Index('offers_by_profileRoleConstraints'),
            q.Concat([
              q.Select(['profileRole'], q.Var('profileRoleConstraint')),
              '_',
              q.Select(['level'], q.Var('profileRoleConstraint')),
            ])
          )
        )
      )
    ),
    null
  )

// Range filters out inactive (endDate has passed) offers
const ActiveOffers = () =>
  q.Range(q.Match(q.Index('offers_with_endDate')), q.Now(), [])
