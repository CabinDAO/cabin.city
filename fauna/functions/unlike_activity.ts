import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { RefFromSet } from '../lib/RefFromSet'

const unlikeActivity: FunctionResource = {
  name: 'unlike_activity',
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
          q.IsNonEmpty(q.Var('match')),
          q.Delete(RefFromSet(q.Var('match'))),
          null
        )
      )
    )
  ),
}

export default unlikeActivity
