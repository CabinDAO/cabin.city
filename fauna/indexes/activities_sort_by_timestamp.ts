import { query } from 'faunadb'
const { Collection } = query

const ActivitiesSortedByTimestamp = {
  name: 'activities_sorted_by_timestamp',
  source: Collection('Activity'),
  values: [
    {
      field: ['data', 'timestamp'],
      reverse: true,
    },
    {
      field: ['ref'],
    },
  ],
}

export default ActivitiesSortedByTimestamp
