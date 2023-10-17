import { query as q } from 'faunadb'

export const createOnlyFor = (fieldKeys: string | string[]) => {
  const keyPath = ['data'].concat(
    Array.isArray(fieldKeys) ? fieldKeys : [fieldKeys]
  )
  return q.Query((values) =>
    q.Let(
      {
        creatingForSelf: q.Equals(
          q.CurrentIdentity(),
          q.Select(keyPath, values)
        ),
        isAdmin: q.Equals(
          q.Select(['data', 'isAdmin'], q.Get(q.CurrentIdentity()), false),
          true
        ),
      },
      q.Or(q.Var('creatingForSelf'), q.Var('isAdmin'))
    )
  )
}
