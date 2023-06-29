import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useProfile } from '../auth/useProfile'
import { CitizenshipStatus, useToggleSignalMutation } from '@/generated/graphql'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { loadUnlockCheckout } from './UnlockScript'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'
import { useWallets } from '@privy-io/react-auth'
import { useChainSwitch } from '../hooks/useChainSwitch'
import { useCallback, useEffect, useState } from 'react'

export const CitizenshipView = () => {
  const { user } = useProfile({ redirectTo: '/' })
  const { wallets } = useWallets()
  const [attemptedMint, setAttemptedMint] = useState(false)

  const { handleSwitch, rightChain } = useChainSwitch()

  const handleMint = useCallback(async () => {
    if (!wallets[0] || !rightChain) {
      handleSwitch()
      setAttemptedMint(true)
      return
    }

    const provider = await wallets[0].getEthereumProvider()

    if (!provider) return

    loadUnlockCheckout(provider)
  }, [handleSwitch, rightChain, wallets])

  useEffect(() => {
    if (attemptedMint && rightChain) {
      handleMint()
      setAttemptedMint(false)
    }
  }, [attemptedMint, handleMint, rightChain])

  const [toggleSignal] = useToggleSignalMutation()

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
          approvedDueToCabinBalance={
            user?.cabinTokenBalanceInt >= MINIMUM_CABIN_BALANCE
          }
        />
      )}
      <CitizenNFTContainer />
    </SingleColumnLayout>
  )
}
