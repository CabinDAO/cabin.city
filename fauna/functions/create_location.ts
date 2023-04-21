import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const createLocation: FunctionResource = {
  name: 'create_location',
  body: q.Query(
    q.Lambda(
      [],
      q.Let(
        {
          profileRef: q.CurrentIdentity(),
          profile: q.Get(q.Var('profileRef')),
        },
        q.Create(q.Collection('Location'), {
          data: {
            caretaker: q.Var('profileRef'),
            caretakerEmail: q.Select(['data', 'email'], q.Var('profile')),
          },
        })
      )
    )
  ),
}

export default createLocation
