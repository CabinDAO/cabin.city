import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { CreateProfile } from '../lib/CreateProfile'

const createProfile: FunctionResource = {
  name: 'create_profile',
  body: q.Query(
    q.Lambda(
      ['data'],
      CreateProfile({
        address: q.Select(['address'], q.Var('data')),
        name: q.Select(['name'], q.Var('data')),
        email: q.Select(['email'], q.Var('data')),
        roles: q.Select(['roles'], q.Var('data')),
        avatar: q.Select(['avatar'], q.Var('data')),
      })
    )
  ),
}

export default createProfile
