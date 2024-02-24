import { usePrivy } from '@privy-io/react-auth'

function SignMessageButton() {
  const { user, signMessage } = usePrivy()
  // Replace this with the message you'd like your user to sign
  const message = 'Hello world'
  // Replace this with the text you'd like on your signature modal,
  // if you do not have `noPromptsOnSignature` enabled
  const uiConfig = {
    title: 'Sample title text',
    description: 'Sample description text',
    buttonText: 'Sample button text',
  }

  // Users must have an embedded wallet at `user.wallet` to sign a message.
  return (
    <button
      disabled={!user?.wallet}
      onClick={async () => {
        const signature = await signMessage(message, uiConfig)
        // Use `signature` however you'd like
        console.log(signature)
      }}
    >
      Sign Message With Privy
    </button>
  )
}

export default SignMessageButton
