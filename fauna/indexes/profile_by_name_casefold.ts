import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profileByNameCasefold: IndexResource = {
  name: 'profile_by_name_casefold',
  source: {
    collection: q.Collection('Profile'),
    fields: {
      nameCasefold: q.Query(
        q.Lambda(
          'profileDoc',
          q.Casefold(q.Select(['data', 'name'], q.Var('profileDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'nameCasefold',
    },
  ],
  unique: true,
}

export default profileByNameCasefold
