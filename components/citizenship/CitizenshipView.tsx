import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { loadUnlockCheckout } from './UnlockScript'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'
import { useWallets } from '@privy-io/react-auth'
import { useChainSwitch } from '@/components/hooks/useChainSwitch'
import { addressMatch } from '@/utils/address-match'
import { useExternalUser } from '../auth/useExternalUser'
import analytics from '@/lib/googleAnalytics/analytics'
import { useNavigation } from '@/components/hooks/useNavigation'
import { useAuth } from '@/components/auth/useAuth'
import { CitizenshipStatus } from '@/utils/types/profile'
import { useBackend } from '@/components/hooks/useBackend'

export const CitizenshipView = () => {
  const { user } = useUser()
  const { externalUser } = useExternalUser()
  const { wallets } = useWallets()
  const { goBack } = useNavigation()
  const { confirmLoggedIn } = useAuth()

  const performMint = async () => {
    const currentUserWallet = wallets.find((w) =>
      addressMatch(w.address, externalUser?.wallet?.address ?? '')
    )

    if (!currentUserWallet) {
      console.warn(
        `performMint(): No wallet found for ${externalUser?.wallet?.address}`
      )
      return
    }

    const provider = await currentUserWallet.getEthereumProvider()

    if (!provider) {
      console.warn(`performMint(): could not get eth provider for wallet`)
      return
    }

    loadUnlockCheckout(provider)
  }

  const { handleSwitch, isOnRightChain } = useChainSwitch(performMint)

  const handleMint = async () => {
    if (!user) return

    analytics.mintEvent(user.externId ?? '')

    const currentUserWallet = wallets.find((w) =>
      addressMatch(w.address, externalUser?.wallet?.address ?? '')
    )

    if (!currentUserWallet || !isOnRightChain) {
      handleSwitch()
      return
    }

    performMint()
  }

  const { useMutate } = useBackend()
  const { trigger: toggleSignal } = useMutate('api_profile_signalInterest')

  const handleToggleSignal = () => {
    confirmLoggedIn(() => {
      analytics.signalInterestEvent(user?.externId ?? '')
      toggleSignal({})
    })
  }

  return (
    <BaseLayout>
      <TitleCard
        title="Citizenship"
        icon="back-arrow"
        onIconClick={() => goBack('goHomeIfNoHistory')}
      />

      {user?.citizenshipStatus !== CitizenshipStatus.Verified && (
        <CitizenshipStatusBar
          onMint={handleMint}
          onSignal={handleToggleSignal}
          status={user?.citizenshipStatus}
          profileId={user?.externId ?? ''}
          approvedDueToCabinBalance={
            (user?.cabinTokenBalanceInt ?? 0) >= MINIMUM_CABIN_BALANCE
          }
        />
      )}
      <CitizenNFTContainer />
    </BaseLayout>
  )
}
