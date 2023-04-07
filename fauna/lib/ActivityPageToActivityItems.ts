import { Expr, query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'

/**
 * Extends a `Page` of `Activity` documents with derived data.
 * @param page A `Page` of `Activity` documents.
 * @returns `ActivitiesResult` model (see schema.graphql)
 */
export const ActivityPageToActivityItems = (page: Expr) => {
  return q.Let(
    {
      activityItems: q.Map(
        page,
        q.Lambda(
          'activity',
          q.Let(
            {
              activityRef: SelectRef(q.Var('activity')),
            },
            {
              activity: q.Var('activityRef'),
              reactionCount: q.Count(
                q.Match(
                  q.Index('activityReaction_activity_by_activity'),
                  q.Var('activityRef')
                )
              ),
              hasReactionByMe: q.If(
                q.HasCurrentIdentity(),
                q.IsNonEmpty(
                  q.Match(
                    q.Index('activityReaction_by_activity_and_profile'),
                    q.Var('activityRef'),
                    q.CurrentIdentity()
                  )
                ),
                false
              ),
            }
          )
        )
      ),
    },
    q.Var('activityItems')
  )
}
