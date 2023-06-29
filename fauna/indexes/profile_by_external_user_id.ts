import { IndexResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'

const profileByExternalUserId: IndexResource = {
  name: 'profile_by_external_user_id',
  source: {
    collection: q.Collection('Profile'),
    fields: {
      externalUserIdCasefold: q.Query(
        q.Lambda(
          'profileDoc',
          q.Casefold(q.Select(['data', 'externalUserId'], q.Var('profileDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'externalUserIdCasefold',
    },
  ],
  unique: true,
}

export default profileByExternalUserId
