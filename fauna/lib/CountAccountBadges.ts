import { query as q, ExprVal } from 'faunadb'

export const CountAccountBadges = (accountRefExpr: ExprVal) => {
  return q.Count(q.Match(q.Index('account_badges_by_account'), accountRefExpr))
}
