import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { CountAccountBadges } from './CountAccountBadges'

export const SyncProfileBadgeCount = (
  profileExpr: Expr,
  accountRefExpr: Expr
) => {
  return q.If(
    q.IsNull(profileExpr),
    null,
    q.Let(
      {
        account: q.Get(accountRefExpr),
        badgeCount: CountAccountBadges(SelectRef(q.Var('account'))),
      },
      q.Update(SelectRef(profileExpr), {
        data: {
          badgeCount: q.Var('badgeCount'),
        },
      })
    )
  )
}
