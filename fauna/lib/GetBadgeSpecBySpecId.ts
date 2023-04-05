import { query as q } from 'faunadb'

export const GetBadgeSpecBySpecId = (badgeSpecId: string) => {
  return q.Let(
    {
      badgeSpecRef: q.Match(
        q.Index('unique_OtterspaceBadgeSpec_specId'),
        badgeSpecId
      ),
    },
    q.If(q.Exists(q.Var('badgeSpecRef')), q.Get(q.Var('badgeSpecRef')), null)
  )
}
