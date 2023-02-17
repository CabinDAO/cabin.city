import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profileByEmailCasefold: IndexResource = {
  name: 'profile_by_email_casefold',
  source: {
    collection: q.Collection('Profile'),
    fields: {
      emailCasefold: q.Query(
        q.Lambda(
          'profileDoc',
          q.Casefold(q.Select(['data', 'email'], q.Var('profileDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'emailCasefold',
    },
  ],
  unique: true,
}

export default profileByEmailCasefold
