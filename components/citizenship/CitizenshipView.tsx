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
    // TODO: Uncomment when citizenship minting is enabled
    // window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
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

  if (!user) return null

  return (
    <SingleColumnLayout displayLaunchBanner>
      <TitleCard title="Citizenship" icon="back-arrow" iconHref="/" />

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
