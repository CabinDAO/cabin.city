const prefix = '/api/v2'

enum Routes {
  HAT_LIST = `/hat/list`,
  BADGE_LIST = `/badge/list`,
  SYNC_ATTEMPT_LIST = `/syncAttempt/list`,
  SYNC_ATTEMPT_GET = `/syncAttempt/get`,

  ACCOUNT_LIST = `/account/list`,
  ACCOUNT_COUNT = `/account/count`,

  PROFILE_LIST = `/profile/list`,
  PROFILE_NEW = `/profile/new`,
  PROFILE = `/profile/[externId]`,
  PROFILE_VOUCH = `/profile/vouch`,
  PROFILE_VOTES = `/profile/votes`,
  PROFILE_ME = `/profile/me`,
  PROFILE_DID = `/profile/did`, // just for auth
  PROFILE_SETUP_STATE = `/profile/setup-state`, // todo: might roll into profile edit

  LOCATION_LIST = `/location/list`,
  LOCATION_NEW = `/location/new`,
  LOCATION_GET = `/location/get`,
  LOCATION_EDIT = `/location/edit`,
  LOCATION_DELETE = `/location/delete`,
  LOCATION_VOTE = `/location/vote`,

  OFFER_LIST = `/offer/list`,
  OFFER_NEW = `/offer/new`,
  OFFER_GET = `/offer/get`,
  OFFER_EDIT = `/offer/edit`,
  OFFER_DELETE = `/offer/delete`,

  ACTIVITY_LIST = `/activity/list`,
  ACTIVITY_NEW = `/activity/new`,
  ACTIVITY_REACT = `/activity/react`,
  ACTIVITY_SUMMARY = `/activity/summary`,

  // CART_LIST: `/cart/list`,
  // CART_GET: `/cart/get`,
}

/*
GET /hats
GET /badges

GET /syncAttempt?key,status
DELETE /syncAttempt/[key]


GET /accounts?address
GET /accounts/count?tokenHoldersOnly

GET /locations?id,type,offerType,sortByVote,paginate
GET/POST/DELETE /location/[id]
POST /location/new
GET /locations/count

GET/offers?id,offerType,paginate
GET/POST/DELETE /offer/[id]
POST /offer/new
GET /offers/count?offerType


GET /profiles?query,name,externalUserId,email,roleTypes,levelTypes,citizenshipStatuses,sort
GET /me
GET/POST /profile/[id]
POST /profile/new
GET /profiles/count?query,roleTypes,levelTypes,citizenshipStatuses,sort
POST/DELETE /profile/vouch

GET /activities?profileId
POST /activity/new
POST/DELETE /activity/[id]/like

GET /cart
GET/POST /cart/[id]

POST /trackingEvent

* */

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
