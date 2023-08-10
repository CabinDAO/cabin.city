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
import { addressMatch } from '@/utils/address-match'
import { useExternalUser } from '../auth/useExternalUser'
import events from '@/lib/googleAnalytics/events'
import { useEmail } from '@/components/hooks/useEmail'
import { EmailType, VouchRequstedPayload } from '@/lib/mail/types'

export const CitizenshipView = () => {
  const { user } = useProfile({ redirectTo: '/' })
  const { externalUser } = useExternalUser()
  const { wallets } = useWallets()
  const { sendEmail } = useEmail()

  const performMint = async () => {
    const currentUserWallet = wallets.find((w) =>
      addressMatch(w.address, externalUser?.wallet?.address ?? '')
    )

    if (!currentUserWallet) return

    const provider = await currentUserWallet.getEthereumProvider()

    if (!provider) return

    loadUnlockCheckout(provider)
  }

  const { handleSwitch, rightChain } = useChainSwitch(performMint)

  const handleMint = async () => {
    events.mintEvent(user?._id ?? '')

    const currentUserWallet = wallets.find((w) =>
      addressMatch(w.address, externalUser?.wallet?.address ?? '')
    )

    if (!currentUserWallet || !rightChain) {
      handleSwitch()
      return
    }

    performMint()
  }

  const [toggleSignal] = useToggleSignalMutation()

  const handleToggleSignal = () => {
    if (!user) return

    events.signalInterestEvent(user?._id ?? '')

    sendEmail({
      type: EmailType.VOUCH_REQUESTED,
      data: {
        name: user?.name,
        email: user?.email,
        profileId: user?._id,
      } as VouchRequstedPayload,
    })

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
          profileId={user?._id}
          approvedDueToCabinBalance={
            user?.cabinTokenBalanceInt >= MINIMUM_CABIN_BALANCE
          }
        />
      )}
      <CitizenNFTContainer />
    </SingleColumnLayout>
  )
}
