import { useEffect } from 'react'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { addressMatch } from '@/utils/address-match'
import { useMeQuery } from '@/generated/graphql'

/*
  This hook is used to fetch the current user from the server.
  It can be used to determine if the user is logged in or not.
  It can be configured to redirect to login if the user is not logged in:
  const { user } = useUser({ redirectTo: '/' })
  Or it can be configured to redirect to a different page if the user is logged in:
  const { user } = useUser({ redirectToIfFound: '/profile' })
  The `user` can have the following values:
  - `undefined` if the login status is not known yet
  - `null` if the user is not logged in
  - `MeFragment` if the user is logged in
*/
export const useUser = ({ redirectTo = '', redirectToIfFound = '' } = {}) => {
  const { data, loading } = useMeQuery()
  const { address } = useAccount()

  const me = data?.me

  useEffect(() => {
    if (me && !addressMatch(me.account.address, address ?? '0x0')) {
      Router.push('/logout')
    }

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !loading && !me) {
      Router.push(redirectTo)
    } else if (redirectToIfFound && me) {
      Router.push(redirectToIfFound)
    }
  }, [redirectTo, redirectToIfFound, address, me, loading])

  return { user: me, isUserLoading: loading }
}
