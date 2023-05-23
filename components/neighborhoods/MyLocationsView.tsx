import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatus } from '@/generated/graphql'
import { NewListingButton } from './NewListingButton'
import { MyLocations } from './MyLocations'

export const MyLocationsView = () => {
  const { user } = useUser({ redirectTo: '/' })

  if (!user) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard
        icon="draft-proposal"
        title="My Locations"
        end={
          user?.citizenshipStatus === CitizenshipStatus.Verified ? (
            <NewListingButton />
          ) : null
        }
      />
      <MyLocations />
    </SingleColumnLayout>
  )
}
