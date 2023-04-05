import { AddHats, HatToAdd } from '@/fauna/lib/AddHats'
import { CompleteSyncAttempt } from '@/fauna/lib/CompleteSyncAttempt'
import { HatToRemove, RemoveHats } from '@/fauna/lib/RemoveHats'
import { AddressActivity, UpsertActivities } from '@/fauna/lib/UpsertActivities'
import { query as q, Expr } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const syncHatRoles = async (
  syncAttemptRef: Expr,
  hatsToAdd: HatToAdd[],
  hatsToRemove: HatToRemove[],
  activities: AddressActivity[]
) => {
  return faunaServerClient.query(
    q.Do(
      AddHats(hatsToAdd),
      RemoveHats(hatsToRemove),
      UpsertActivities(activities),
      CompleteSyncAttempt(syncAttemptRef)
    )
  )
}
