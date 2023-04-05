import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { GetProfileByAddress } from '../lib/GetProfileByAddress'

const createAccessToken: FunctionResource = {
  name: 'create_access_token',
  body: q.Query(
    q.Lambda(
      ['address', 'ttl'],
      q.Let(
        {
          profile: GetProfileByAddress(q.Var('address')),
          token: q.Create(q.Tokens(), {
            instance: q.Select(['ref'], q.Var('profile')),
            data: { type: 'access' },
            ttl: q.TimeAdd(q.Now(), q.Var('ttl'), 'seconds'),
          }),
        },
        { profile: q.Var('profile'), accessToken: q.Var('token') }
      )
    )
  ),
}

export default createAccessToken
