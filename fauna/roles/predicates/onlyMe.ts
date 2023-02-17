import { query as q } from 'faunadb'

// Only the current user can read its own user document.
export const onlyMe = q.Query(
  q.Lambda('ref', q.Equals(q.CurrentIdentity(), q.Var('ref')))
)
