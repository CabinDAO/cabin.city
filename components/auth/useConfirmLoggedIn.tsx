import { useCallback } from 'react'
import { usePrivy } from '@privy-io/react-auth'

export const useConfirmLoggedIn = () => {
  const { authenticated, ready } = usePrivy()
  const { login } = usePrivy()

  const confirmLoggedIn = useCallback(
    (onConfirmed?: () => void) => {
      if (ready && !authenticated) {
        // TODO: re-enable this
        // login()
      } else if (authenticated) {
        onConfirmed?.()
      }
    },
    [authenticated, ready, login]
  )

  return {
    confirmLoggedIn,
  }
}
