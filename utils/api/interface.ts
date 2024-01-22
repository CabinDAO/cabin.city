import { route, RouteName } from '@/utils/routes'
import useSWR from 'swr'
// import {URL} from 'url'

// TODO: use useSWRMutation for POST requests
// https://swr.vercel.app/docs/mutation#useswrmutation

// TODO: use useSWRInfinite for pagination
// https://swr.vercel.app/docs/pagination

type UrlParams =
  | string[][]
  | Record<string, string | string[] | number | undefined>
  | string
  | URLSearchParams

export const apiGet = async <Data = any>(
  routeName: RouteName,
  params: UrlParams = {},
  token: string | null = null
): Promise<Data> => {
  return _apiGet(route(routeName), params, token)
}

export const apiPost = async <Data = any>(
  routeName: RouteName,
  params: object = {},
  token: string | null = null
): Promise<Data> => {
  return _apiPost(route(routeName), params, token)
}

// passing null as first param allows for conditional fetching
// https://swr.vercel.app/docs/conditional-fetching#conditional

export const useAPIGet = <Data = any>(
  routeName: RouteName | null,
  params: UrlParams = {},
  token: string | null = null
) => {
  const fetcher = <Data>(args: readonly [any, ...unknown[]]) =>
    _apiGet(args[0] as string, params, token)
  return useSWR<Data>(
    routeName ? [route(routeName), params, token] : null,
    fetcher
  )
}

export const useAPIPost = <Data = any>(
  routeName: RouteName | null,
  params: object = {},
  token: string | null = null
) => {
  const fetcher = (url: string) => _apiPost(url, params, token)
  return useSWR<Data>(routeName ? route(routeName) : null, fetcher)
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

  const queryString = params
    ? '?' + new URLSearchParams(cleanParams(params))
    : ''

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
