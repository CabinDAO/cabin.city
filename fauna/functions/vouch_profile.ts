import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const vouchProfile: FunctionResource = {
  name: 'vouch_profile',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          voucherProfileRef: q.CurrentIdentity(),
          profileRef: q.Ref(q.Collection('Profile'), q.Var('id')),
          citizenshipStatus: q.Select(
            ['data', 'citizenshipStatus'],
            q.Get(q.Var('profileRef'))
          ),
        },
        q.If(
          q.Equals(q.Var('citizenshipStatus'), 'VouchRequested'),
          q.Update(q.Var('profileRef'), {
            data: {
              vouchedBy: q.Var('voucherProfileRef'),
              citizenshipStatus: 'Vouched',
            },
          }),
          q.Get(q.Var('profileRef'))
        )
      )
    )
  ),
}

export default vouchProfile
