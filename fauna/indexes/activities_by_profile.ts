import { query } from 'faunadb'
const { Collection } = query

const ActivitiesSortedByTimestamp = {
  name: 'activities_by_profile',
  source: Collection('Activity'),
  terms: [{ field: ['data', 'profile'] }],
  values: [
    {
      field: ['data', 'timestamp'],
      reverse: true,
    },
    { field: ['ref'] },
  ],
}

export default ActivitiesSortedByTimestamp
