import { query as q } from 'faunadb'

const ProfileVouchesByVouchee = {
  name: 'profile_vouches_by_vouchee',
  source: {
    collection: q.Collection('ProfileVouch'),
  },
  terms: [{ field: ['data', 'vouchee'] }],
}

export default ProfileVouchesByVouchee
