import { ExprVal, query as q } from 'faunadb'

export const GetProfileByExternalUserId = (externalUserIdExpr: ExprVal) => {
  return q.Let(
    {
      profileRef: q.Match(
        q.Index('profile_by_external_user_id'),
        externalUserIdExpr
      ),
    },
    q.If(q.Exists(q.Var('profileRef')), q.Get(q.Var('profileRef')), null)
  )
}
