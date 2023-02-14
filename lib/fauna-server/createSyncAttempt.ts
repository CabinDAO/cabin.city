import { query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'

export const createSyncAttempt = async (
  key: string,
  status: string,
  startBlock: string,
  endBlock: string
) => {
  return faunaServerClient.query(
    q.Create(q.Collection('BlockSyncAttempt'), {
      data: {
        key,
        status,
        startBlock,
        endBlock,
      },
    })
  )
}
