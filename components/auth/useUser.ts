import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { addressMatch } from '@/utils/address-match'
import { MeFragment, useMeLazyQuery } from '@/generated/graphql'

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
  const [user, setUser] = useState<MeFragment | null>()
  const [getMe] = useMeLazyQuery()
  const { address } = useAccount()

  useEffect(() => {
    let isSubscribed = true

    ;(async () => {
      try {
        const { data, error } = await getMe()
        if (error) {
          console.error(error)
        } else {
          const me = data?.me

          if (me && !addressMatch(me.account.address, address ?? '0x0')) {
            Router.push('/logout')
          }

          // If redirectTo is set, redirect if the user was not found.
          if (redirectTo && !me) {
            Router.push(redirectTo)
          } else if (redirectToIfFound && me) {
            Router.push(redirectToIfFound)
          } else if (isSubscribed) {
            setUser(me)
          }
        }
      } catch (err) {
        console.error(err)
      }
    })()

    return () => {
      isSubscribed = false
    }
  }, [redirectTo, redirectToIfFound, getMe, setUser, address])

  return { user }
}
