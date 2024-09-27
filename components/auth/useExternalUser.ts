import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter, Route } from '@/components/hooks/useRouter'

export const useExternalUser = ({
  redirectTo,
  redirectToIfFound,
}: {
  redirectTo?: Route
  redirectToIfFound?: Route
} = {}) => {
  const router = useRouter()
  const { authenticated, user, ready } = usePrivy()

  useEffect(() => {
    if (redirectTo && ready && !authenticated) {
      router.push(redirectTo)
    } else if (redirectToIfFound && user) {
      router.push(redirectToIfFound)
    }
  }, [ready, authenticated, user, redirectTo, redirectToIfFound])

  return { externalUser: user, isUserLoading: !ready }
}
