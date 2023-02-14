import { ExprVal, query as q } from 'faunadb'

export interface UpsertBadgeFields {
  badgeId: string
}

export const UpsertBadge = (
  badge: UpsertBadgeFields,
  specExpr: ExprVal,
  accountRefExpr: ExprVal
) => {
  return q.Let(
    {
      badgeMatch: q.Match(
        q.Index('unique_OtterspaceBadge_badgeId'),
        badge.badgeId
      ),
    },
    q.If(
      q.IsEmpty(q.Var('badgeMatch')),
      q.Create(q.Collection('OtterspaceBadge'), {
        data: {
          badgeId: badge.badgeId,
          account: accountRefExpr,
          spec: specExpr,
        },
      }),
      null // Do nothing if the badge already exists
    )
  )
}
