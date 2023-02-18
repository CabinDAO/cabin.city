import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const trackingEventsByKeyAndProfile: IndexResource = {
  name: 'tracking_events_by_key_and_profile',
  source: {
    collection: q.Collection('TrackingEvent'),
    fields: {
      keyCasefold: q.Query(
        q.Lambda(
          'trackingEventDoc',
          q.Casefold(q.Select(['data', 'key'], q.Var('trackingEventDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'keyCasefold',
    },
    { field: ['data', 'profile'] },
  ],
  unique: true,
}

export default trackingEventsByKeyAndProfile
