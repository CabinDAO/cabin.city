import { useCallback } from 'react'
import { useEvent } from 'react-use'
import { useProfile } from '../auth/useProfile'
import { useCitizenship } from '../hooks/useCitizenship'
import { CitizenshipStatus } from '@/utils/types/profile'
import { unlockConfig } from '@/lib/protocol-config'
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'
import { appDomainWithProto } from '@/utils/display-utils'
import { expandRoute } from '@/utils/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadUnlockCheckout = async (provider: any) => {
  const paywallConfig = {
    locks: {
      [unlockConfig.contractAddress]: {
        network: unlockConfig.chainId,
        recurringPayments: 10,
      },
    },
    useDelegatedProvider: true,
    dataBuilder: `${appDomainWithProto}${expandRoute('UNLOCK_DATA_BUILDER')}`,
    pessimistic: true,
    skipRecipient: true,
    title: 'Cabin Citizenship',
    icon: `${appDomainWithProto}/images/cabin-nft.png`,
    referrer: '0x522C6b0Aa5A14E1771Aab5646247349fFa9E5111',
  }

  const paywall = new Paywall(networks)
  paywall.setPaywallConfig(paywallConfig)
  paywall.connect(provider)

  console.log('loadinging checkout modal')
  paywall.loadCheckoutModal()
}

// https://docs.unlock-protocol.com/tools/paywall/#user-info
export const UnlockScript = () => {
  const { user } = useProfile()
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

  if (!unlockConfig.contractAddress || !unlockConfig.chainId) {
    console.error('Missing config for UnlockScript')
    return null
  }

  return null
}
