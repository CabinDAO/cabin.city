import { CitizenshipStatus } from '@/generated/graphql'
import { unlockConfig } from '@/lib/protocol-config'
import Script from 'next/script'
import { useCallback } from 'react'
import { useEvent } from 'react-use'
import { useUser } from '../auth/useUser'
import { useCitizenship } from '../hooks/useCitizenship'

// https://docs.unlock-protocol.com/tools/paywall/#user-info
export const UnlockScript = () => {
  const { user } = useUser()
  const { checkStatus } = useCitizenship()

  // Called when the Unlock lib emits status events
  const handleStatus = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      console.info('Unlock state', e.detail.state)
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

  if (!user) {
    return null
  }

  return (
    <Script id="unlock-script">
      {`
        var unlockProtocolConfig = {
          locks: { '${unlockConfig.contractAddress}': { network: ${unlockConfig.chainId} } },
          dataBuilder:"https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/unlock/data-builder",
          pessimistic: true,
          skipRecipient: true,
          title: 'Cabin Citizenship',
          icon: "https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/cabin-nft.png",
          expectedAddress: '${user?.account.address}',
        };

      (function(d, s) {
        var js = d.createElement(s),
          sc = d.getElementsByTagName(s)[0];
        js.src="https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
        sc.parentNode.insertBefore(js, sc); }(document, "script"));
      `}
    </Script>
  )
}
