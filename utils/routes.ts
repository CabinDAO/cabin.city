const prefix = '/api/v2'

enum Routes {
  PROFILE = `/profile/[externId]`,
  PROFILE_NEW = `/profile/new`,
  PROFILE_LIST = `/profile/list`,
  PROFILE_VOUCH = `/profile/vouch`,
  PROFILE_ME = `/profile/me`,
  PROFILE_DID = `/profile/did`, // just for auth
  PROFILE_SETUP_STATE = `/profile/setup-state`, // todo: might roll into profile edit
  PROFILE_SIGNAL_INTEREST = `/profile/signal-interest`,

  LOCATION = `/location/[externId]`,
  LOCATION_NEW = `/location/new`,
  LOCATION_LIST = `/location/list`,

  EVENT = `/event/[externId]`,
  EVENT_NEW = `/event/new`,
  EVENT_LIST = `/event/list`,

  ACTIVITY = `/activity/[externId]`,
  ACTIVITY_NEW = `/activity/new`,
  ACTIVITY_LIST = `/activity/list`,
  ACTIVITY_REACT = `/activity/react`,

  EMAIL_SEND = '/email/send',
  NEWSLETTER_SUBSCRIBE = '/newsletter/subscribe',

  UNLOCK_DATA_BUILDER = '/unlock/data-builder',
  UNLOCK_REFETCH_STATUS = '/unlock/refetch-status',

  INVITE_CLAIM = `/invite/claim`,

  CART = `/cart/[externId]`,
  CHECKOUT_CREATE_PAYMENT_INTENT = '/checkout/create-payment-intent',
  CHECKOUT_STRIPE_WEBHOOK = '/checkout/stripe/webhook', // called by Stripe

  DEV = '/dev',
}

export const expandRoute = (r: Route): string => {
  const [name, params] = Array.isArray(r) ? r : [r, {}]

  let path: string = Routes[name]

  const vars = Array.from(path.matchAll(/\[(\w+)\]/g), (x) => x[1])

  if (vars) {
    const missingVars = vars.filter((x) => !Object.keys(params).includes(x))
    const extraVars = Object.keys(params).filter((x) => !vars.includes(x))

    if (missingVars.length > 0) {
      throw new Error(
        `expandRoute: Missing parameter for route ${name}: ${missingVars.join(
          ', '
        )}`
      )
    }

    if (extraVars.length > 0) {
      throw new Error(
        `expandRoute: Extraneous parameter for route ${name}: ${extraVars.join(
          ', '
        )}`
      )
    }

    for (const k in params) {
      path = path.replace(`[${k}]`, params[k])
    }
  }

  if (path.includes('[')) {
    throw new Error(
      `expandRoute: Somehow there's still a [ after replacing params for ${name}`
    )
  }

  return `${prefix}${path}`
}

type RouteName = keyof typeof Routes
type Params = { [key: string]: string }
// we used to allow params in the url, and we may again in the future
// but for now we're passing everything as query/body params
// export type Route = RouteName
export type Route = RouteName | [RouteName, Params]
