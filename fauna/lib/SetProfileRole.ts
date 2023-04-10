import { ExprVal, query as q } from 'faunadb'
import { GetProfileByAddress } from './GetProfileByAddress'

export const SetProfileRole = (
  addressExpr: ExprVal,
  profileRoleExpr: ExprVal | null
) => {
  return q.Let(
    {
      profile: GetProfileByAddress(addressExpr),
    },
    q.If(
      q.Or(q.IsNull(q.Var('profile')), q.IsNull(profileRoleExpr)),
      // No profile exists or no profile role is set, skip
      null,
      q.Let(
        {
          profileRoles: q.Select(['data', 'roles'], q.Var('profile'), []),
          // Filter previous matching roles (e.g. the user already self selected an Apprentice role)
          filteredProfileRoles: q.Filter(
            q.Var('profileRoles'),
            q.Lambda(
              'profileRole',
              q.Not(
                q.Equals(
                  q.Select(['role'], q.Var('profileRole')),
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  q.Select(['role'], profileRoleExpr!)
                )
              )
            )
          ),
        },
        q.Update(q.Select('ref', q.Var('profile')), {
          data: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            roles: q.Append(profileRoleExpr!, q.Var('filteredProfileRoles')),
          },
        })
      )
    )
  )
}
