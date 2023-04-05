import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const me: FunctionResource = {
  name: 'me',
  body: q.Query(q.Lambda([], q.Get(q.CurrentIdentity()))),
}

export default me
