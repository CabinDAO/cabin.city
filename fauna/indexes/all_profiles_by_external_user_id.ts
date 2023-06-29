import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const profilesNullExternalUserId: IndexResource = {
  name: 'profiles_null_external_user_id',
  source: {
    collection: q.Collection('Profile'),
    fields: {
      null_externalUserId: q.Query(
        q.Lambda(
          'profile',
          q.Equals(
            q.Select(['data', 'externalUserId'], q.Var('profile'), null),
            null
          )
        )
      ),
    },
  },
  terms: [{ binding: 'null_externalUserId' }],
}

export default profilesNullExternalUserId
