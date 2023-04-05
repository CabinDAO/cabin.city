import { query as q } from 'faunadb'

const ProfileVouchesByVoucher = {
  name: 'profile_vouches_by_voucher',
  source: {
    collection: q.Collection('ProfileVouch'),
  },
  terms: [{ field: ['data', 'voucher'] }],
}

export default ProfileVouchesByVoucher
