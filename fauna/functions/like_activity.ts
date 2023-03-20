import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const likeActivity: FunctionResource = {
  name: 'like_activity',
  body: q.Query(
    q.Lambda(
      ['activityId'],
      q.Let(
        {
          activityRef: q.Ref(q.Collection('Activity'), q.Var('activityId')),
          match: q.Match(
            q.Index('activityReaction_by_activity_and_profile'),
            q.Var('activityRef'),
            q.CurrentIdentity()
          ),
        },
        q.If(
          q.IsEmpty(q.Var('match')),
          q.Create('ActivityReaction', {
            data: {
              activity: q.Var('activityRef'),
              profile: q.CurrentIdentity(),
            },
          }),
          null
        )
      )
    )
  ),
}

export default likeActivity
