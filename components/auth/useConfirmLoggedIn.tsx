import { useCallback } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'
import analytics from '@/lib/googleAnalytics/analytics'

export const useConfirmLoggedIn = (logAnalyticsEvent?: boolean) => {
  const { authenticated, ready } = usePrivy()
  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      console.log(
        'LOGIN',
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount
      )
    },
  })

  const confirmLoggedIn = useCallback(
    (onConfirmed?: VoidFunction) => {
      if (ready && !authenticated) {
        if (logAnalyticsEvent) {
          analytics.signInEvent()
        }
        login()
      } else if (authenticated) {
        onConfirmed?.()
      }
    },
    [authenticated, ready, login, logAnalyticsEvent]
  )

  return {
    confirmLoggedIn,
  }
}
