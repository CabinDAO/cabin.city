import { query as q } from 'faunadb'
import { GetProfileByAddress } from './GetProfileByAddress'

export const RemoveProfileRole = (address: string, hatId: string) => {
  return q.Let(
    {
      profile: GetProfileByAddress(address),
    },
    q.If(
      q.Or(q.IsNull(q.Var('profile')), q.IsNull(hatId)),
      // No profile exists or no profile role is set, skip
      null,
      q.Let(
        {
          profileRoles: q.Select(['data', 'roles'], q.Var('profile')),
          newProfileRoles: q.Filter(
            q.Var('profileRoles'),
            q.Lambda(
              'role',
              q.Not(q.Equals(q.Select(['hatId'], q.Var('role')), hatId))
            )
          ),
        },
        q.Update(q.Select('ref', q.Var('profile')), {
          data: {
            roles: q.Var('newProfileRoles'),
          },
        })
      )
    )
  )
}
