import { expandRoute, Route } from '@/utils/routes'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import useSWRInfinite from 'swr/infinite'
import { APIError, Paginated } from '@/utils/types/shared'
// import {URL} from 'url'

export const PAGE_SIZE = 20

export const NO_TOKEN = async () => null

type PostMethod = 'POST' | 'DELETE'

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
  return _apiPost(expandRoute(route), 'POST', params, await tokenFn())
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

export const useAPIGetPaginated = <Data extends Paginated | APIError = any>(
  route: Route,
  params: UrlParams = {},
  tokenFn: () => Promise<string | null>
) => {
  const getKey = (pageIndex: number, previousPageData: Data | null) => {
    if (
      previousPageData &&
      (!('count' in previousPageData) || previousPageData.count < PAGE_SIZE)
    ) {
      return null
    }

    const url = expandRoute(route)
    const searchParams = new URLSearchParams(cleanParams(params))
    const queryString =
      `?page=${pageIndex + 1}` +
      (searchParams ? '&' + searchParams : '').replace(/[\?\&]$/, '')

    return url + queryString
  }

  const fetcher = async <Data>(url: string) => {
    return _apiGet(url, {}, await tokenFn())
  }

  const { data, error, mutate, size, setSize } = useSWRInfinite<Data>(
    getKey,
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty =
    data?.[0] && 'count' in data?.[0] ? data?.[0]?.count === 0 : true
  const lastItem = data?.[data.length - 1]
  const isLastPage =
    isEmpty || (lastItem && 'count' in lastItem && lastItem.count < PAGE_SIZE)

  return {
    data,
    error,
    isEmpty,
    isLoadingMore,
    page: size,
    setPage: setSize,
    isLastPage,
    mutate,
  }
}

export const useAPIMutate = <Data = any>(
  route: Route | null,
  method: PostMethod = 'POST',
  tokenFn: () => Promise<string | null>
) => {
  const fetcher = async (url: string, options: { arg: object }) =>
    _apiPost(url, method, options.arg, await tokenFn())
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

  const searchParams = new URLSearchParams(cleanParams(params))
  const queryString = (
    searchParams ? (url.indexOf('?') === -1 ? '?' : '&') + searchParams : ''
  ).replace(/[\?\&]$/, '')

  const res = await fetch(url + queryString, {
    method: 'GET',
    headers: headers,
  })

  return res.json()
}

const _apiPost = async (
  url: string,
  method: PostMethod = 'POST',
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
    method,
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
      const val = params[key]
      if (val !== undefined && val !== null) {
        // if params[key] is an array, join it with commas
        if (Array.isArray(val)) {
          if ((val.length || 0) > 0) {
            cleaned[key] = (val as string[]).join(',')
          }
        } else {
          cleaned[key] = val as string
        }
      }
    })

    return cleaned
  }

  return params
}
