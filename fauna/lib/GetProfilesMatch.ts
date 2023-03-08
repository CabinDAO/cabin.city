import { Expr, ExprVal, query as q } from 'faunadb'

const ProfilesByRoleType = (roleTypes: Expr) =>
  q.If(
    q.IsNonEmpty(roleTypes),
    q.Union(
      q.Map(
        roleTypes,
        q.Lambda(
          'roleType',
          q.Match(q.Index('profiles_by_role'), q.Var('roleType'))
        )
      )
    ),
    q.Documents(q.Collection('Profile'))
  )

const ProfilesByLevelType = (levelTypes: Expr) =>
  q.If(
    q.IsNonEmpty(levelTypes),
    q.Union(
      q.Map(
        levelTypes,
        q.Lambda(
          'levelType',
          q.Match(q.Index('profiles_by_level'), q.Var('levelType'))
        )
      )
    ),
    q.Documents(q.Collection('Profile'))
  )

const ProfilesByCitizenshipStatus = (citizenshipStatuses: Expr) =>
  q.If(
    q.IsNonEmpty(citizenshipStatuses),
    q.Union(
      q.Map(
        citizenshipStatuses,
        q.Lambda(
          'citizenshipStatus',
          q.Match(
            q.Index('profiles_by_citizenship_status'),
            q.Var('citizenshipStatus')
          )
        )
      )
    ),
    q.Documents(q.Collection('Profile'))
  )

// Returns a set reference that can be used for both paginated queries (get_profiles) and count queries (profiles_count)
export const GetProfilesMatch = (input: ExprVal) => {
  return q.Let(
    {
      roleTypes: q.Select(['roleTypes'], input, []),
      levelTypes: q.Select(['levelTypes'], input, []),
      citizenshipStatuses: q.Select(['citizenshipStatuses'], input, []),
    },
    q.Intersection(
      ProfilesByRoleType(q.Var('roleTypes')),
      ProfilesByLevelType(q.Var('levelTypes')),
      ProfilesByCitizenshipStatus(q.Var('citizenshipStatuses'))
    )
  )
}
