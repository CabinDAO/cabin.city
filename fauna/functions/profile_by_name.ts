import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const profileByName: FunctionResource = {
  name: 'profile_by_name',
  body: q.Query(
    q.Lambda(
      ['name'],
      q.Get(
        q.Match(q.Index('profile_by_name_casefold'), q.Casefold(q.Var('name')))
      )
    )
  ),
}

export default profileByName
