import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatus, useToggleSignalMutation } from '@/generated/graphql'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { useGetUnlockNFT } from '../hooks/useGetUnlockNFT'
import { useAccount } from 'wagmi'
import { loadUnlockCheckout } from './UnlockScript'
import { unlockConfig } from '@/lib/protocol-config'

export const CitizenshipView = () => {
  const { activeNFT } = useGetUnlockNFT()
  const { user } = useUser({ redirectTo: '/' })
  const { connector } = useAccount()

  const [toggleSignal] = useToggleSignalMutation()

  const handleMint = async () => {
    if (!connector) return

    const provider = await connector.getProvider({
      chainId: unlockConfig.chainId,
    })

    loadUnlockCheckout(provider)
  }

  const handleToggleSignal = () => {
    if (!user) return

    toggleSignal()
  }

  if (!user) return null

  return (
    <SingleColumnLayout>
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
      {activeNFT ? <CitizenNFTContainer /> : null}
    </SingleColumnLayout>
  )
}
