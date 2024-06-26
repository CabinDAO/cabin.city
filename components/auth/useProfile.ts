import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { addressMatch } from '@/utils/address-match'
import { ProfileMeResponse } from '@/utils/types/profile'
import { usePrivy } from '@privy-io/react-auth'
import { useBackend } from '@/components/hooks/useBackend'

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
export const useProfile = ({
  redirectTo = '',
  redirectToIfFound = '',
} = {}) => {
  const router = useRouter()
  const { user: privyUser, ready } = usePrivy()
  const { useGet } = useBackend()
  const {
    data: meData,
    isLoading: isMeLoading,
    mutate: refetchProfile,
  } = useGet<ProfileMeResponse>('PROFILE_ME')

  const me =
    (ready && !privyUser) || !meData || 'error' in meData ? null : meData.me

  useEffect(() => {
    if (
      me &&
      me.walletAddress &&
      privyUser?.wallet?.address &&
      !addressMatch(me.walletAddress, privyUser?.wallet?.address ?? '0x0')
    ) {
      router.push('/logout').then()
    }

    if (me && !isMeLoading && !me.privyDID) {
      router.push('/registration').then()
    }

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !isMeLoading && !me) {
      router.push(redirectTo).then()
    } else if (redirectToIfFound && me) {
      router.push(redirectToIfFound).then()
    }
  }, [redirectTo, redirectToIfFound, privyUser, me, isMeLoading, router])

  return {
    user: me,
    isUserLoading: isMeLoading,
    refetchProfile,
  }
}
