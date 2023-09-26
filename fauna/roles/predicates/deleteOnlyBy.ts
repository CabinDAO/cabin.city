import { query as q } from 'faunadb'

export const deleteOnlyBy = (fieldKeys: string | string[]) => {
  const keyPath = ['data'].concat(
    Array.isArray(fieldKeys) ? fieldKeys : [fieldKeys]
  )
  return q.Query(
    q.Lambda(
      'ref',
      q.Equals(q.CurrentIdentity(), q.Select(keyPath, q.Get(q.Var('ref'))))
    )
  )
}
