import { GetLatestSyncAttempt } from '@/fauna/lib/GetLatestSyncAttempt'
import { query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLatestSyncAttempts = async (syncKey: string): Promise<any> => {
  return faunaServerClient.query(
    q.Let(
      {
        latestSuccessfulAttempt: GetLatestSyncAttempt(syncKey, 'Successful'),
        latestPendingAttempt: GetLatestSyncAttempt(syncKey, 'Pending'),
        latestFailedAttempt: GetLatestSyncAttempt(syncKey, 'Failed'),
      },
      {
        latestSuccessfulAttempt: q.Var('latestSuccessfulAttempt'),
        latestPendingAttempt: q.Var('latestPendingAttempt'),
        latestFailedAttempt: q.Var('latestFailedAttempt'),
      }
    )
  )
}
