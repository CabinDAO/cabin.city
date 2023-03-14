import Script from 'next/script'

const lockAddress = process.env.NEXT_PUBLIC_CITIZENSHIP_LOCK_ADDRESS
const lockChainId = process.env.NEXT_PUBLIC_CITIZENSHIP_LOCK_CHAIN_ID

export const UnlockScript = () => {
  if (!lockAddress || !lockChainId) {
    console.error('Missing environment variables for UnlockScript')
    return null
  }

  return (
    <Script id="unlock-script">
      {`
        var unlockProtocolConfig = {
          locks: { '${process.env.NEXT_PUBLIC_CITIZENSHIP_LOCK_ADDRESS}': { network: ${process.env.NEXT_PUBLIC_CITIZENSHIP_LOCK_CHAIN_ID} } },
          pessimistic: true,
          skipRecipient: true,
          title: 'Cabin Citizenship',
          icon: '',
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
