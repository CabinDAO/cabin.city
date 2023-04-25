import { query as q } from 'faunadb'

export const writeOnlyBy = (fieldKey: string) =>
  q.Query((oldData, newData, ref) =>
    q.Equals(q.CurrentIdentity(), q.Select(['data', fieldKey], q.Get(ref)))
  )
