import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { useProfile } from '../auth/useProfile'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { loadUnlockCheckout } from './UnlockScript'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'
import { useWallets } from '@privy-io/react-auth'
import { useChainSwitch } from '../hooks/useChainSwitch'
import { addressMatch } from '@/utils/address-match'
import { useExternalUser } from '../auth/useExternalUser'
import analytics from '@/lib/googleAnalytics/analytics'
import { useEmail } from '@/components/hooks/useEmail'
import { EmailType, VouchRequstedPayload } from '@/lib/mail/types'
import { useNavigation } from '@/components/hooks/useNavigation'
import { useConfirmLoggedIn } from '@/components/auth/useConfirmLoggedIn'
import { CitizenshipStatus } from '@/utils/types/profile'
import { useBackend } from '@/components/hooks/useBackend'

export const CitizenshipView = () => {
  const { user } = useProfile()
  const { externalUser } = useExternalUser()
  const { wallets } = useWallets()
  const { sendEmail } = useEmail()
  const { goBack } = useNavigation()
  const { confirmLoggedIn } = useConfirmLoggedIn()

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
  const { trigger: toggleSignal } = useMutate('PROFILE_SIGNAL_INTEREST')

  const handleToggleSignal = () => {
    confirmLoggedIn(() => {
      analytics.signalInterestEvent(user?.externId ?? '')

      sendEmail({
        type: EmailType.VOUCH_REQUESTED,
        data: {
          name: user?.name,
          email: user?.email,
          profileId: user?.externId,
        } as VouchRequstedPayload,
      })

      toggleSignal({})
    })
  }

  return (
    <SingleColumnLayout>
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
    </SingleColumnLayout>
  )
}
