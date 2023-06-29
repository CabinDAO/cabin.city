import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const profileByEmail: FunctionResource = {
  name: 'profile_by_email',
  body: q.Query(
    q.Lambda(
      ['email'],
      q.Get(
        q.Match(
          q.Index('profile_by_email_casefold'),
          q.Casefold(q.Var('email'))
        )
      )
    )
  ),
}

export default profileByEmail
