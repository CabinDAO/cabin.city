import { CompleteSyncAttempt } from '@/fauna/lib/CompleteSyncAttempt'
import { UpsertAccount } from '@/fauna/lib/UpsertAccount'
import { NewActivity, UpsertActivities } from '@/fauna/lib/UpsertActivities'
import { UpsertBadge, UpsertBadgeFields } from '@/fauna/lib/UpsertBadge'
import {
  UpsertBadgeSpec,
  UpsertBadgeSpecFields,
} from '@/fauna/lib/UpsertBadgeSpec'
import { query as q, Expr } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { faunaServerClient } from './faunaServerClient'

export interface BadgeToAdd {
  address: string
  badge: UpsertBadgeFields
  spec: UpsertBadgeSpecFields
}

export const syncBadges = async (
  syncAttemptRef: Expr,
  badgesToAdd: BadgeToAdd[],
  activities: NewActivity[]
) => {
  return faunaServerClient.query(
    q.Do(
      badgesToAdd.map((badgeToAdd) =>
        q.Let(
          {
            badgeSpec: UpsertBadgeSpec(badgeToAdd.spec),
            account: UpsertAccount(badgeToAdd.address),
          },
          UpsertBadge(
            badgeToAdd.badge,
            SelectRef(q.Var('badgeSpec')),
            SelectRef(q.Var('account'))
          )
        )
      ),
      UpsertActivities(activities),
      CompleteSyncAttempt(syncAttemptRef)
    )
  )
}
