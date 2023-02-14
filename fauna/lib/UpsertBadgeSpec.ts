import { query as q } from 'faunadb'
import { GetBadgeSpecBySpecId } from './GetBadgeSpecBySpecId'

export interface UpsertBadgeSpecFields {
  specId: string
  name?: string
  description?: string
  image?: string
}

export const UpsertBadgeSpec = (badgeSpec: UpsertBadgeSpecFields) => {
  return q.Let(
    {
      badgeSpec: GetBadgeSpecBySpecId(badgeSpec.specId),
    },
    q.If(
      q.IsNull(q.Var('badgeSpec')),
      q.Create(q.Collection('OtterspaceBadgeSpec'), {
        data: badgeSpec,
      }),
      q.Var('badgeSpec')
    )
  )
}
