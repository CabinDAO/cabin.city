import { useCallback, useMemo } from 'react'
import { useRouter as useNextRouter } from 'next/router'
import { Route as RoutingRoute, expandRoute } from '@/utils/routing'

export type Route = RoutingRoute

export const useRouter = () => {
  const router = useNextRouter()

  // Create a memoized version of the restricted functions
  const pushRoute = useCallback(
    (route: Route) => {
      return router.push(expandRoute(route))
    },
    [router]
  )
  const replaceRoute = useCallback(
    (route: Route) => {
      return router.replace(expandRoute(route))
    },
    [router]
  )

  // Create a memoized version of the extended router object
  return useMemo(
    () => ({
      ...router,
      pushRaw: router.push, // so we can still go direct
      replaceRaw: router.replace, // so we can still go direct
      push: pushRoute,
      replace: replaceRoute,
    }),
    [router, pushRoute, replaceRoute]
  )
}
