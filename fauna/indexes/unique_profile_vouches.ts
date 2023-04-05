import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const uniqueProfileVouches: IndexResource = {
  name: 'unique_profile_vouches',
  source: {
    collection: q.Collection('ProfileVouch'),
  },
  terms: [
    {
      field: ['data', 'vouchee'],
    },
    {
      field: ['data', 'voucher'],
    },
  ],
  unique: true,
  serialized: true,
}

export default uniqueProfileVouches
