import { ExprVal, query as q } from 'faunadb'

export const GetProfileByAccountRef = (accountRef: ExprVal) => {
  return q.Let(
    {
      profileRef: q.Match(q.Index('account_profile_by_account'), accountRef),
    },
    q.If(q.IsEmpty(q.Var('profileRef')), null, q.Get(q.Var('profileRef')))
  )
}
