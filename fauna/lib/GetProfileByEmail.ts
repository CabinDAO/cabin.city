import { ExprVal, query as q } from 'faunadb'

export const GetProfileByEmail = (emailExpr: ExprVal) => {
  return q.Let(
    {
      profileRef: q.Match(
        q.Match(q.Index('profile_by_email_casefold'), q.Casefold(emailExpr))
      ),
    },
    q.If(q.Exists(q.Var('profileRef')), q.Get(q.Var('profileRef')), null)
  )
}
