import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const blockSyncAttemptsByKeyAndStatus: IndexResource = {
  name: 'block_sync_attempts_by_key_and_status',
  source: q.Collection('BlockSyncAttempt'),
  terms: [{ field: ['data', 'key'] }, { field: ['data', 'status'] }],
  values: [
    {
      field: ['ts'],
      reverse: true,
    },
    {
      field: ['ref'],
    },
  ],
}

export default blockSyncAttemptsByKeyAndStatus
