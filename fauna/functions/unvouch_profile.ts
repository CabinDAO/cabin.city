import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const unVouchProfile: FunctionResource = {
  name: 'unvouch_profile',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          profileRef: q.Ref(q.Collection('Profile'), q.Var('id')),
          citizenshipStatus: q.Select(
            ['data', 'citizenshipStatus'],
            q.Get(q.Var('profileRef')),
            null
          ),
        },
        q.If(
          q.Equals(q.Var('citizenshipStatus'), 'Vouched'),
          q.Let(
            {
              delete: q.Map(
                q.Paginate(
                  q.Match(
                    q.Index('profile_vouches_by_vouchee'),
                    q.Var('profileRef')
                  )
                ),
                q.Lambda('vouchRef', q.Delete(q.Var('vouchRef')))
              ),
            },
            q.Update(q.Var('profileRef'), {
              data: {
                citizenshipStatus: 'VouchRequested',
              },
            })
          ),
          q.Get(q.Var('profileRef'))
        )
      )
    )
  ),
}

export default unVouchProfile
