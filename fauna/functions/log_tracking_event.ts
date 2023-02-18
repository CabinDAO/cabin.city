import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { RefFromSet } from '../lib/RefFromSet'

const logTrackingEvent: FunctionResource = {
  name: 'log_tracking_event',
  body: q.Query(
    q.Lambda(
      ['key'],
      q.Let(
        {
          profileRef: q.CurrentIdentity(),
          trackingEventSet: q.Match(
            q.Index('tracking_events_by_key_and_profile'),
            q.Casefold(q.Var('key')),
            q.Var('profileRef')
          ),
        },
        q.If(
          q.IsNonEmpty(q.Var('trackingEventSet')),
          q.Let(
            {
              trackingEventRef: RefFromSet(q.Var('trackingEventSet')),
              trackingEvent: q.Get(q.Var('trackingEventRef')),
              count: q.Select(['data', 'count'], q.Var('trackingEvent')),
            },
            q.Update(q.Var('trackingEventRef'), {
              data: {
                count: q.Add(q.Var('count'), 1),
              },
            })
          ),
          q.Create(q.Collection('TrackingEvent'), {
            data: {
              profile: q.Var('profileRef'),
              key: q.Var('key'),
              count: 1,
            },
          })
        )
      )
    )
  ),
}

export default logTrackingEvent
