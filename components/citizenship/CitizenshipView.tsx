import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import {
  CitizenshipStatus,
  useUpdateProfileCitizenshipStatusMutation,
} from '@/generated/graphql'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'

export const CitizenshipView = () => {
  const { user } = useUser({ redirectTo: '/login' })
  const [updateProfileCitizenshipStatus] =
    useUpdateProfileCitizenshipStatusMutation()

  const handleMint = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  const toggleSignal = () => {
    if (!user) return

    if (user?.citizenshipStatus === CitizenshipStatus.VouchRequested) {
      updateProfileCitizenshipStatus({
        variables: {
          id: user._id,
          citizenshipStatus: null,
        },
      })
    } else {
      updateProfileCitizenshipStatus({
        variables: {
          id: user._id,
          citizenshipStatus: CitizenshipStatus.VouchRequested,
        },
      })
    }
  }

  return (
    <SingleColumnLayout>
      <TitleCard
        title="Citizenship"
        icon="back-arrow"
        iconHref={`/profile/${user?._id}`}
      />

      {user && user?.citizenshipStatus !== CitizenshipStatus.Verified && (
        <CitizenshipStatusBar
          onMint={handleMint}
          onSignal={toggleSignal}
          status={user?.citizenshipStatus}
        />
      )}
      <CitizenNFTContainer />
    </SingleColumnLayout>
  )
}
