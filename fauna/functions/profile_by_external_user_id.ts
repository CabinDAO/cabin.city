import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const profileByExternalUserId: FunctionResource = {
  name: 'profile_by_external_user_id',
  body: q.Query(
    q.Lambda(
      ['externalUserId'],
      q.Get(
        q.Match(
          q.Index('profile_by_external_user_id'),
          q.Casefold(q.Var('externalUserId'))
        )
      )
    )
  ),
}

export default profileByExternalUserId
