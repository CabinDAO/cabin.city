import { useCallback } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'
import analytics from '@/lib/googleAnalytics/analytics'
import { useRouter } from '@/components/hooks/useRouter'
import { apiGet, NO_TOKEN } from '@/utils/api/backend'
import { ProfileDIDParamsType, ProfileDIDResponse } from '@/utils/types/profile'

export const useAuth = ({
  logAnalyticsEvent,
}: {
  logAnalyticsEvent?: boolean
} = {}) => {
  const router = useRouter()
  const { authenticated, ready, logout } = usePrivy()
  const { login } = useLogin({
    onComplete: async (
      user
      // isNewUser,
      // wasAlreadyAuthenticated,
      // loginMethod,
      // linkedAccount
    ) => {
      const privyDID = user.id
      // todo: security issue? this call lets anyone know we have an account for a did
      const data = await apiGet<ProfileDIDResponse>(
        'api_profile_did',
        { did: privyDID } satisfies ProfileDIDParamsType,
        NO_TOKEN
      )

      if ('error' in data) {
        console.log('error calling api_profile_did route', data.error)
      } else if (data.externId) {
        router.pushRaw(router.asPath, undefined, { scroll: false }).then()
      } else {
        router.push('registration').then()
      }
    },
    onError: (error) => {
      console.log('error logging in', error)
    },
  })

  const handleLogout = async () => {
    await logout()

    // Force reload to clear apollo cache and prevent weird state updates
    ;(window as Window).location = '/'
  }

  const confirmLoggedIn = useCallback(
    (onConfirmed?: VoidFunction) => {
      if (ready && !authenticated) {
        if (logAnalyticsEvent) {
          analytics.signInEvent()
        }
        login({ disableSignup: true })
      } else if (authenticated) {
        onConfirmed?.()
      }
    },
    [authenticated, ready, login, logAnalyticsEvent]
  )

  return {
    confirmLoggedIn,
    handleLogout,
  }
}
