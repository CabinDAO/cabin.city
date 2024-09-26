import { useEffect } from 'react'
import { useRouter, Route } from '@/components/hooks/useRouter'
import { usePrivy } from '@privy-io/react-auth'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileMeResponse } from '@/utils/types/profile'
import { addressMatch } from '@/utils/address-match'

/*
  This hook is used to fetch the current user from the server.
  It can be used to determine if the user is logged in or not.
  It can be configured to redirect to login if the user is not logged in:
  const { user } = useProfile({ redirectTo: '/' })
  Or it can be configured to redirect to a different page if the user is logged in:
  const { user } = useProfile({ redirectToIfFound: '/profile' })
  The `user` can have the following values:
  - `undefined` if the login status is not known yet
  - `null` if the user is not logged in
  - `MeFragment` if the user is logged in
*/
export const useUser = ({
  redirectTo,
  redirectToIfFound,
}: {
  redirectTo?: Route
  redirectToIfFound?: Route
} = {}) => {
  const router = useRouter()
  const { user: privyUser, ready } = usePrivy()
  const { useGet } = useBackend()
  const {
    data: userData,
    isLoading: isUserLoading,
    mutate: refetchUser,
  } = useGet<ProfileMeResponse>('api_profile_me')

  const user =
    (ready && !privyUser) || !userData || 'error' in userData
      ? null
      : userData.me

  useEffect(() => {
    if (
      user &&
      user.walletAddress &&
      privyUser?.wallet?.address &&
      !addressMatch(user.walletAddress, privyUser?.wallet?.address ?? '0x0')
    ) {
      router.push('logout').then()
    }

    if (user && !isUserLoading && !user.privyDID) {
      router.push('registration').then()
    }

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !isUserLoading && !user) {
      router.push(redirectTo).then()
    } else if (redirectToIfFound && user) {
      router.push(redirectToIfFound).then()
    }
  }, [redirectTo, redirectToIfFound, privyUser, user, isUserLoading, router])

  return { user, isUserLoading, refetchUser }
}
