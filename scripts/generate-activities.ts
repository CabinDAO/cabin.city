import { faunaServerClient } from '../lib/fauna-server/faunaServerClient'
import {
  AddressActivity,
  UpsertActivities,
} from '../fauna/lib/UpsertActivities'
import {
  ActivityType,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '../generated/graphql'
import { getUnixTime } from 'date-fns'

const range = Array.from({ length: 100 }, (x, i) => i)
// Ensure this address has an associated profile - otherwise the activity will be skipped
const address = '0x5685f4d3d59Ef81beEac49f80B785290F9F2ec5c'
const activities: AddressActivity[] = range.map((i) => {
  const timestamp = getUnixTime(new Date()).toString()
  const randomActivityType = Math.floor(Math.random() * 2)

  // ProfileRoleAdded
  if (randomActivityType === 0) {
    const randomRoleIndex = Math.floor(Math.random() * 6)
    const roleType = Object.values(ProfileRoleType)[randomRoleIndex]

    return {
      address,
      activity: {
        key: `ProfileRoleAdded|${i}`,
        type: ActivityType.ProfileRoleAdded,
        timestamp,
        metadata: {
          profileRole: {
            role: roleType,
            level: ProfileRoleLevelType.Artisan,
          },
        },
      },
    }
  }

  // ProfileCreated
  return {
    address,
    activity: {
      key: `ProfileCreated|${i}`,
      type: ActivityType.ProfileCreated,
      timestamp,
    },
  }
})

async function generateActivities() {
  console.info('Generating activities...')

  await faunaServerClient.query(UpsertActivities(activities))
}

generateActivities()
