import { faunaServerClient } from '../lib/fauna-server/faunaServerClient'
import {
  AddressActivity,
  UpsertActivities,
} from '../fauna/lib/UpsertActivities'
import { ActivityType } from '../generated/graphql'

const range = Array.from({ length: 100 }, (x, i) => i)
const activities: AddressActivity[] = range.map((i) => ({
  // Ensure this address has an associated profile - otherwise the activity will be skipped
  address: '0x5685f4d3d59Ef81beEac49f80B785290F9F2ec5c',
  activity: {
    key: `ProfileBadgeAdded|${i}`,
    type: ActivityType.ProfileBadgeAdded,
    timestamp: new Date().toISOString(),
  },
}))

async function generateActivities() {
  console.info('Generating activities...')

  await faunaServerClient.query(UpsertActivities(activities))
}

generateActivities()
