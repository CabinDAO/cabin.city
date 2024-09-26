import { Routes } from '@/generated/routes'

type RouteName = keyof typeof Routes
type Params = { [key: string]: string }
export type Route = RouteName | [RouteName, Params]

export const expandRoute = (r: Route): string => {
  const [name, params] = Array.isArray(r) ? r : [r, {} as Params]

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

  return path
}

// if you want to restrict the routes to only api routes, you can use these

type ApiRouteName = Extract<RouteName, `api_${string}`>
export type ApiRoute = ApiRouteName | [ApiRouteName, Params]

export const expandApiRoute = (r: ApiRoute): string => {
  return expandRoute(r)
}
