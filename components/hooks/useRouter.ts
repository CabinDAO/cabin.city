import { useCallback, useMemo } from 'react'
import { useRouter as useNextRouter } from 'next/router'
import { Route as RoutingRoute, expandRoute } from '@/utils/routing'

export type Route = RoutingRoute

export const useRouter = () => {
  const router = useNextRouter()

  // Create a memoized version of the restricted push function
  const pushRoute = useCallback(
    (route: Route) => {
      return router.push(expandRoute(route))
    },
    [router]
  )

  // Create a memoized version of the extended router object
  return useMemo(
    () => ({
      ...router,
      pushRaw: router.push, // so we can still go direct
      push: pushRoute,
    }),
    [router, pushRoute]
  )
}
