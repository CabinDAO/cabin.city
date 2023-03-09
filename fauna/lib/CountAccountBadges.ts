import { query as q, Expr } from 'faunadb'

export const CountAccountBadges = (accountRefExpr: Expr) => {
  return q.Count(q.Match(q.Index('account_badges_by_account'), accountRefExpr))
}
