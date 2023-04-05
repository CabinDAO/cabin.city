import { ExprVal, query as q } from 'faunadb'
import { Find } from 'faunadb-fql-lib'
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
          profileRoles: q.Select(['data', 'roles'], q.Var('profile')),
          roleAlreadyExists: q.Not(
            q.IsNull(
              Find(
                q.Var('profileRoles'),
                q.Lambda('role', q.Equals(q.Var('role'), profileRoleExpr))
              )
            )
          ),
        },
        q.If(
          q.Var('roleAlreadyExists'),
          // Role already exists, skip
          null,
          // Role does not exist, add it
          q.Update(q.Select('ref', q.Var('profile')), {
            data: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              roles: q.Append(profileRoleExpr!, q.Var('profileRoles')),
            },
          })
        )
      )
    )
  )
}
