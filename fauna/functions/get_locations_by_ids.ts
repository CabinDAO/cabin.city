import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const getLocationsByIds: FunctionResource = {
  name: 'get_locations_by_ids',
  body: q.Query(
    q.Lambda(
      ['ids'],
      q.Map(
        q.Var('ids'),
        q.Lambda('id', q.Get(q.Ref(q.Collection('Location'), q.Var('id'))))
      )
    )
  ),
}

export default getLocationsByIds
