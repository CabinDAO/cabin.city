import { useEffect } from 'react'
import Router from 'next/router'
import { addressMatch } from '@/utils/address-match'
import { MeFragment, useMeQuery } from '@/generated/graphql'
import { useExternalUser } from './useExternalUser'
import { Profile } from '@/generated/graphql'

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
  const { data, loading, refetch } = useMeQuery()
  const { externalUser, isUserLoading } = useExternalUser()

  const me = !externalUser && !isUserLoading ? null : data?.me

  useEffect(() => {
    if (
      me &&
      externalUser?.wallet?.address &&
      !addressMatch(me.account.address, externalUser?.wallet?.address ?? '0x0')
    ) {
      Router.push('/logout')
    }

    if (me && !loading && !me.externalUserId) {
      Router.push('/registration')
    }

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !loading && !me) {
      Router.push(redirectTo)
    } else if (redirectToIfFound && me) {
      Router.push(redirectToIfFound)
    }
  }, [redirectTo, redirectToIfFound, externalUser, me, loading])

  return {
    user: me as MeFragment | null | undefined,
    isUserLoading: loading,
    refetchProfile: refetch,
  }
}
