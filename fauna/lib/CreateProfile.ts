import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { ActivityType, ProfileAvatarInput } from '../../generated/graphql'
import { CountAccountBadges } from './CountAccountBadges'
import { SafeString } from './SafeString'
import { TruncateBigNumber } from './TruncateBigNumber'
import { UpsertAccount } from './UpsertAccount'
import { UpsertActivity } from './UpsertActivity'

export interface CreateProfileInput {
  address: string | Expr
  name: string | Expr
  email: string | Expr
  avatar?: ProfileAvatarInput | undefined | Expr
}

export const CreateProfile = (input: CreateProfileInput) => {
  return q.Let(
    {
      account: UpsertAccount(input.address),
      // If the owning account has a cabinTokenBalance, copy its truncated amount, otherwise default to 0
      cabinTokenBalanceInt: q.If(
        q.ContainsPath(['data', 'cabinTokenBalance'], q.Var('account')),
        TruncateBigNumber(
          q.Select(['data', 'cabinTokenBalance'], q.Var('account'))
        ),
        0
      ),
      badgeCount: CountAccountBadges(SelectRef(q.Var('account'))),
      profile: q.Create(q.Collection('Profile'), {
        data: {
          account: q.Select('ref', q.Var('account')),
          createdAt: q.Now(),
          name: SafeString(input.name),
          email: SafeString(input.email),
          avatar: input.avatar,
          roles: [],
          contactFields: [],
          cabinTokenBalanceInt: q.Var('cabinTokenBalanceInt'),
          badgeCount: q.Var('badgeCount'),
        },
      }),
      activity: UpsertActivity(q.Var('profile'), {
        key: q.Format(
          'ProfileCreated|%s',
          q.Select(['ref', 'id'], q.Var('profile'))
        ),
        timestamp: q.Select(['data', 'createdAt'], q.Var('profile')),
        type: ActivityType.ProfileCreated,
      }),
    },
    q.Var('profile')
  )
}
