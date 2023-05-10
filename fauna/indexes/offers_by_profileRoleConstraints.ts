import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const offersByProfileRoleConstraints: IndexResource = {
  name: 'offers_by_profileRoleConstraints',
  source: {
    collection: q.Collection('Offer'),
    fields: {
      /*
        Creates an array of role/level tuples formatted as: `{role}_{level}` strings.
        Example: ['Builder_Apprentice', 'Builder_Artisan', 'Caretaker_Apprentice']
      */
      profileRoleConstraints: q.Query(
        q.Lambda(
          'itemDoc',
          q.Map(
            q.Select(['data', 'profileRoleConstraints'], q.Var('itemDoc'), []),
            q.Lambda(
              'profileRoleConstraint',
              q.Concat([
                q.Select(['profileRole'], q.Var('profileRoleConstraint')),
                '_',
                q.Select(['level'], q.Var('profileRoleConstraint')),
              ])
            )
          )
        )
      ),
    },
  },
  terms: [
    {
      binding: 'profileRoleConstraints',
    },
  ],
  values: [{ field: ['data', 'endDate'] }, { field: ['ref'] }],
}

export default offersByProfileRoleConstraints
