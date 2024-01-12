const prefix = '/api/v2'

export const Routes: { [key: string]: string } = {
  HAT_LIST: `/hat`,
  BADGE_LIST: `/badge`,
  SYNC_ATTEMPT_LIST: `/syncAttempt`,
  SYNC_ATTEMPT: `/syncAttempt/[key]`,

  ACCOUNT_LIST: `/account`,
  ACCOUNT_COUNT: `/account/count`,

  PROFILE_LIST: `/profile`,
  PROFILE: `/profile/[id]`,
  PROFILE_NEW: `/profile/new`,
  PROFILE_COUNT: `/profile/count`,
  PROFILE_VOUCH: `/profile/vouch`,
  PROFILE_VOTES: `/profile/votes`,
  PROFILE_ME: `/me`,

  LOCATION_LIST: `/location`,
  LOCATION: `/location/[id]`,
  LOCATION_NEW: `/location/new`,
  LOCATION_COUNT: `/location/count`,
  LOCATION_VOTE: `/location/vote`,

  OFFER_LIST: `/offer`,
  OFFER: `/offer/[id]`,
  OFFER_NEW: `/offer/new`,
  OFFER_COUNT: `/offer/count`,

  ACTIVITY_LIST: `/activity`,
  ACTIVITY_NEW: `/activity/new`,
  ACTIVITY_LIKE: `/activity/[id]/like`,

  CART_LIST: `/cart`,
  CART: `/cart/[id]`,

  TRACKING_EVENT_NEW: `/track`,
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

export const route = (name: RouteName, params: Params = {}): string => {
  let path = Routes[name]

  const vars = path.match(/\[\w+\]/g)

  if (vars) {
    const missingVars = vars.filter((x) => !Object.keys(params).includes(x))
    const extraVars = Object.keys(params).filter((x) => !vars.includes(x))

    if (missingVars.length > 0) {
      throw new Error(
        `Missing parameter for route ${name}: ${missingVars.join(', ')}`
      )
    }

    if (extraVars.length > 0) {
      throw new Error(
        `Extraneous parameter for route ${name}: ${extraVars.join(', ')}`
      )
    }

    for (const k in params) {
      path = path.replace(k, params[k])
    }
  }

  if (path.includes('[')) {
    throw new Error(
      `Somehow there's still a [ after replacing params for ${name}`
    )
  }

  return `${prefix}${path}`
}

export type RouteName = (typeof Routes)[keyof typeof Routes]

type Params = { [key: string]: string }
