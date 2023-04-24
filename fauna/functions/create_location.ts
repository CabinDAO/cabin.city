import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { LocationType } from '../../generated/graphql'

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
            locationType: LocationType.Outpost,
            caretaker: q.Var('profileRef'),
            caretakerEmail: q.Select(['data', 'email'], q.Var('profile')),
            voteCount: 0,
            offerCount: 0,
          },
        })
      )
    )
  ),
}

export default createLocation
