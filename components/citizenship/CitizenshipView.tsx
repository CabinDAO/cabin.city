import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatus, useToggleSignalMutation } from '@/generated/graphql'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { useGetUnlockNFT } from '../hooks/useGetUnlockNFT'
import { useFeatures } from '../hooks/useFeatures'
import { Feature } from '@/lib/features'
import { useAccount } from 'wagmi'
import { loadUnlockCheckout } from './UnlockScript'

export const CitizenshipView = () => {
  const { hasFeature } = useFeatures()
  const citizenshipMintingEnabled = hasFeature(Feature.Citizenship)
  const { activeNFT } = useGetUnlockNFT()
  const { user } = useUser({ redirectTo: '/' })
  const { connector } = useAccount()

  const [toggleSignal] = useToggleSignalMutation()

  const handleMint = async () => {
    // TODO: Remove check when citizenship minting is enabled in prod
    if (citizenshipMintingEnabled) {
      if (!connector) return // This should not happen...
      const provider = await connector.getProvider({
        chainId: 10,
      })
      loadUnlockCheckout(provider)
    }
  }

  const handleToggleSignal = () => {
    if (!user) return

    toggleSignal()
  }

  if (!user) return null

  return (
    <SingleColumnLayout displayLaunchBanner={!citizenshipMintingEnabled}>
      <TitleCard
        title="Citizenship"
        icon="back-arrow"
        iconHref={`/profile/${user._id}`}
      />

      {user && user?.citizenshipStatus !== CitizenshipStatus.Verified && (
        <CitizenshipStatusBar
          onMint={handleMint}
          onSignal={handleToggleSignal}
          status={user?.citizenshipStatus}
        />
      )}
      {/* TODO: Remove check when citizenship minting is enabled */}
      {activeNFT || citizenshipMintingEnabled ? <CitizenNFTContainer /> : null}
    </SingleColumnLayout>
  )
}
