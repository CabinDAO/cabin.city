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
        },
        q.Let(
          {
            link: q.Create(q.Collection('ProfileVouch'), {
              data: {
                voucher: q.Var('voucherProfileRef'),
                vouchee: q.Var('profileRef'),
              },
            }),
          },
          q.Update(q.Var('profileRef'), {
            data: {
              citizenshipStatus: 'Vouched',
            },
          })
        )
      )
    )
  ),
}

export default vouchProfile
