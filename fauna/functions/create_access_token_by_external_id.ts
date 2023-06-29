import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { GetProfileByExternalUserId } from '../lib/GetProfileByExternalUserId'

const createAccessTokenByExternalId: FunctionResource = {
  name: 'create_access_token_by_external_id',
  body: q.Query(
    q.Lambda(
      ['externalUserId', 'ttl'],
      q.Let(
        {
          profile: GetProfileByExternalUserId(q.Var('externalUserId')),
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

export default createAccessTokenByExternalId
