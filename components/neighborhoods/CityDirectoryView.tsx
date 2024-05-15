import { CitizenshipStatus } from '@/utils/types/profile'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useProfile } from '../auth/useProfile'
import { NewListingButton } from './NewListingButton'
import { LocationsByMemberCount } from '@/components/neighborhoods/LocationsByMemberCount'

export const CityDirectoryView = () => {
  const { user } = useProfile()
  const canCreateListings =
    user?.citizenshipStatus === CitizenshipStatus.Verified

  return (
    <SingleColumnLayout>
      <TitleCard
        title="City Directory"
        icon="neighborhoods"
        end={canCreateListings ? <NewListingButton /> : null}
      ></TitleCard>
      <LocationsByMemberCount />
    </SingleColumnLayout>
  )
}
