import { query as q } from 'faunadb'

export const GetPendingMigrationProfiles = () => {
  return q.Let(
    {
      profiles: q.Map(
        q.Paginate(q.Match(q.Index('profiles_null_external_user_id'), true), {
          size: 20,
        }),
        q.Lambda('ref', q.Get(q.Var('ref')))
      ),
    },
    q.Var('profiles')
  )
}
