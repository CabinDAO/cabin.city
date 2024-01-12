import { route, RouteName } from '@/utils/routes'
import useSWR from 'swr'
// import {URL} from 'url'

export const apiGet = async (
  routeName: RouteName,
  params: Record<string, string> = {},
  token: string | null = null
) => {
  return _apiGet(route(routeName), params, token)
}

export const apiPost = async (
  routeName: RouteName,
  params: object = {},
  token: string | null = null
) => {
  return _apiPost(route(routeName), params, token)
}

// passing null as first param allows for conditional fetching
// https://swr.vercel.app/docs/conditional-fetching#conditional

export const useAPIGet = <Data = any>(
  routeName: RouteName | null,
  params: Record<string, string> = {},
  token: string | null = null
) => {
  const fetcher = (url: string) => _apiGet(url, params, token)
  return useSWR<Data>(routeName ? route(routeName) : null, fetcher)
}

export const useAPIPost = (
  routeName: RouteName | null,
  params: object = {},
  token: string | null = null
) => {
  const fetcher = (url: string) => _apiPost(url, params, token)
  return useSWR(routeName ? route(routeName) : null, fetcher)
}

const _apiGet = async (
  url: string,
  params: Record<string, string> = {},
  token: string | null = null
) => {
  const headers: { [name: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const queryString = params.length ? '?' + new URLSearchParams(params) : ''

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
