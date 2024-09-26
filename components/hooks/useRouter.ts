import { useRouter as useNextRouter } from 'next/router'
import { Route as RoutingRoute, expandRoute } from '@/utils/routing'

export type Route = RoutingRoute

export const useRouter = () => {
  const router = useNextRouter()

  // Override the push method to enforce the route restriction
  const restrictedPush = (route: Route) => {
    return router.push(expandRoute(route))
  }

  // Return the router with the restricted push method
  return {
    ...router,
    pushRaw: router.push, // so we can still go direct
    push: restrictedPush,
  }
}
