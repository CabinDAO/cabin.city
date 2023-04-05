import { Expr, query as q } from 'faunadb'
import { ProfileRoleLevelType } from '../../generated/graphql'

export const SetApprenticeRoles = (profile: Expr, roleTypes: Expr) => {
  return q.Let(
    {
      // Filter out any existing Apprentice-level roles
      nonApprenticeProfileRoles: q.Filter(
        q.Select(['data', 'roles'], profile),
        q.Lambda(
          'profileRole',
          q.Not(
            q.Equals(
              q.Select(['level'], q.Var('profileRole')),
              ProfileRoleLevelType.Apprentice
            )
          )
        )
      ),
      // Construct new profile roles as Apprentice level
      newProfileRoles: q.Map(roleTypes, (roleType) => ({
        role: roleType,
        level: ProfileRoleLevelType.Apprentice,
      })),
    },
    // Merge the new roles with the existing roles
    q.Append(q.Var('nonApprenticeProfileRoles'), q.Var('newProfileRoles'))
  )
}
