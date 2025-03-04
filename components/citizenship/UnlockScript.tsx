import { useCallback } from 'react'
import { useEvent } from 'react-use'
import { useUser } from '../auth/useUser'
import { useCitizenship } from '@/components/contexts/CitizenshipContext'
import { CitizenshipStatus } from '@/utils/types/profile'
import { unlockConfigForEnv } from '@/lib/protocol-config'
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'
import { appDomainWithProto } from '@/utils/display-utils'
import { expandApiRoute } from '@/utils/routing'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadUnlockCheckout = async (provider: any) => {
  const paywallConfig = {
    locks: {
      [unlockConfigForEnv.contractAddress]: {
        network: unlockConfigForEnv.chainId,
        // recurringPayments: 10,
      },
    },
    useDelegatedProvider: true,
    dataBuilder: `${appDomainWithProto}${expandApiRoute(
      'api_unlock_dataBuilder'
    )}`,
    pessimistic: true,
    skipRecipient: true,
    title: 'Cabin Citizenship',
    icon: `${appDomainWithProto}/images/cabin-nft.png`,
    referrer: '0x522C6b0Aa5A14E1771Aab5646247349fFa9E5111',
  }

  const paywall = new Paywall(networks)
  paywall.setPaywallConfig(paywallConfig)
  paywall.connect(provider)
  paywall.loadCheckoutModal()
}

// https://docs.unlock-protocol.com/tools/paywall/#user-info
export const UnlockScript = () => {
  const { user } = useUser()
  const { checkStatus } = useCitizenship()

  // Called when the Unlock lib emits status events
  const handleStatus = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      console.info(`Unlock state: ${e.detail.state}`)
      if (
        e.detail.state === 'unlocked' &&
        user?.citizenshipStatus !== CitizenshipStatus.Verified
      ) {
        console.info('Unlock status changed to unlocked. Checking status...')
        checkStatus()
      } else if (
        e.detail.state === 'locked' &&
        user?.citizenshipStatus === CitizenshipStatus.Verified
      ) {
        console.info('Unlock status changed to locked. Checking status...')
        checkStatus()
      } else {
        console.log(e)
      }
    },
    [checkStatus, user?.citizenshipStatus]
  )

  useEvent('unlockProtocol.status', handleStatus)

  // Called when the Unlock checkout modal is closed
  // Check status to see if the user minted
  useEvent('unlockProtocol.closeModal', checkStatus)

  if (!unlockConfigForEnv.contractAddress || !unlockConfigForEnv.chainId) {
    console.error('Missing config for UnlockScript')
    return null
  }

  return null
}
