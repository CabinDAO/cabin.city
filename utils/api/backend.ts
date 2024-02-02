import { expandRoute, Route } from '@/utils/routes'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
// import {URL} from 'url'

export const PAGE_SIZE = 20

// TODO: consider using useSWRInfinite for pagination
// https://swr.vercel.app/docs/pagination

export type UrlParams =
  | string[][]
  | Record<string, string | string[] | number | undefined>
  | string
  | URLSearchParams

export const apiGet = async <Data = any>(
  route: Route,
  params: UrlParams = {},
  tokenFn: () => Promise<string | null>
): Promise<Data> => {
  return _apiGet(expandRoute(route), params, await tokenFn())
}

export const apiPost = async <Data = any>(
  route: Route,
  params: object = {},
  tokenFn: () => Promise<string | null>
): Promise<Data> => {
  return _apiPost(expandRoute(route), params, await tokenFn())
}

// passing null as first param allows for conditional fetching
// https://swr.vercel.app/docs/conditional-fetching#conditional

export const useAPIGet = <Data = any>(
  route: Route | null,
  params: UrlParams = {},
  tokenFn: () => Promise<string | null>
) => {
  const fetcher = async <Data>(args: readonly [any, ...unknown[]]) =>
    _apiGet(args[0] as string, params, await tokenFn())

  return useSWR<Data>(route ? [expandRoute(route), params] : null, fetcher)
}

// I THINK THE DIFF BETWEEN useAPIPost and useAPIMutate is that useAPIMutate is for changing an
// object thats loaded in memory while post is just for sending a post request
// BUT PROLLY we can switch to useAPIMutate for everything. then the verbs are "fetch" and "mutate"

export const useAPIPost = <Data = any>(
  route: Route | null,
  params: object = {},
  tokenFn: () => Promise<string | null>
) => {
  const fetcher = async (url: string) => _apiPost(url, params, await tokenFn())
  return useSWRMutation<Data>(route ? expandRoute(route) : null, fetcher)
}

export const useAPIMutate = <Data = any>(
  route: Route | null,
  tokenFn: () => Promise<string | null>
) => {
  const fetcher = async (url: string, options: { arg: object }) =>
    _apiPost(url, options.arg, await tokenFn())
  return useSWRMutation<Data, Error, string | null, object>(
    route ? expandRoute(route) : null,
    fetcher
  )
}

const _apiGet = async (
  url: string,
  params: UrlParams = {},
  token: string | null = null
) => {
  const headers: { [name: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const queryString = (
    params ? '?' + new URLSearchParams(cleanParams(params)) : ''
  ).replace(/\?$/, '')

  const res = await fetch(url + queryString, {
    method: 'GET',
    headers: headers,
  })

  return res.json()
}

const _apiPost = async (
  url: string,
  params: object = {},
  token: string | null = null
) => {
  const headers: { [name: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params),
  })

  return res.json()
}

const cleanParams = (params: UrlParams) => {
  if (
    params !== null &&
    typeof params === 'object' &&
    !Array.isArray(params) &&
    !(params instanceof URLSearchParams)
  ) {
    const cleaned: Record<string, string> = {}

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        // if params[key] is an array, join it with commas
        if (Array.isArray(params[key])) {
          cleaned[key] = (params[key] as string[]).join(',')
        } else {
          cleaned[key] = params[key] as string
        }
        // cleaned[key] = params[key] as string
      }
    })

    return cleaned
  }

  return params
}
