import { query as q } from 'faunadb'

export const writeOnlyBy = (fieldKey: string) =>
  q.Query((oldData, newData, ref) =>
    q.Let(
      {
        canWrite: q.Equals(
          q.CurrentIdentity(),
          q.Select(['data', fieldKey], q.Get(ref))
        ),
        isAdmin: q.Equals(
          q.Select(['data', 'isAdmin'], q.Get(q.CurrentIdentity()), false),
          true
        ),
      },
      q.Or(q.Var('canWrite'), q.Var('isAdmin'))
    )
  )
