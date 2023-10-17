import { query as q } from 'faunadb'

export const readOnlyBy = (fieldKeys: string | string[]) => {
  const keyPath = ['data'].concat(
    Array.isArray(fieldKeys) ? fieldKeys : [fieldKeys]
  )
  return q.Query((ref) =>
    q.Let(
      {
        canRead: q.Equals(q.CurrentIdentity(), q.Select(keyPath, q.Get(ref))),
        isAdmin: q.Equals(
          q.Select(['data', 'isAdmin'], q.Get(q.CurrentIdentity()), false),
          true
        ),
      },
      q.Or(q.Var('canRead'), q.Var('isAdmin'))
    )
  )
}
