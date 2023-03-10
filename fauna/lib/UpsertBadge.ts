import { ExprVal, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { ActivityType } from '../../generated/graphql'
import { GetProfileByAccountRef } from './GetProfileByAccountRef'
import { SyncProfileBadgeCount } from './SyncProfileBadgeCount'
import { ToTimestamp } from './ToTimestamp'
import { UpsertActivity } from './UpsertActivity'

export interface UpsertBadgeFields {
  badgeId: string
  createdAt: string
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
      q.Let(
        {
          badge: q.Create(q.Collection('OtterspaceBadge'), {
            data: {
              badgeId: badge.badgeId,
              createdAt: ToTimestamp(badge.createdAt),
              account: accountRefExpr,
              spec: specExpr,
            },
          }),
          profile: GetProfileByAccountRef(accountRefExpr),
        },
        q.Do(
          SyncProfileBadgeCount(q.Var('profile'), accountRefExpr),
          UpsertActivity(q.Var('profile'), {
            key: badge.badgeId,
            type: ActivityType.ProfileBadgeAdded,
            timestamp: q.Select(['data', 'createdAt'], q.Var('badge')),
            metadata: {
              badge: SelectRef(q.Var('badge')),
            },
          })
        )
      ),

      null // Do nothing if the badge already exists
    )
  )
}
