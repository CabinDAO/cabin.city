import { useEffect } from 'react'
import Router from 'next/router'
import { usePrivy } from '@privy-io/react-auth'

export const useExternalUser = ({
  redirectTo = '',
  redirectToIfFound = '',
} = {}) => {
  const { authenticated, user, ready } = usePrivy()

  useEffect(() => {
    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && ready && !authenticated) {
      Router.push(redirectTo)
    } else if (redirectToIfFound && user) {
      Router.push(redirectToIfFound)
    }
  }, [ready, authenticated, user, redirectTo, redirectToIfFound])

  return { externalUser: user, isUserLoading: !ready }
}
