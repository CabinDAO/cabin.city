import { createContext, ReactNode } from 'react'
import { mutate, useSWRConfig } from 'swr'
import { usePrivy } from '@privy-io/react-auth'
import { expandRoute, Route } from '@/utils/routes'
import {
  UrlParams,
  apiGet,
  apiPost,
  useAPIGet,
  useAPIMutate,
} from '@/utils/api/backend'

export const BackendContext = createContext<BackendState | null>(null)

/*
NOTES TO MYSELF:

- think of SWR much more as a cache. it fetches and stores data for keys, and reports its own state
- make sure your URLs correspond to cache keys
- isLoading only happens once, the very first time data is loaded into the cache
- isValidating happens every time data is being updated (aka revalidated)

 */

export interface BackendState {
  useGet: <Data = any>(
    route: Route | null,
    params?: UrlParams
  ) => ReturnType<typeof useAPIGet<Data>>
  useMutate: <Data = any>(
    route: Route | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  useDelete: <Data = any>(
    route: Route | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  get: <Data = any>(
    route: Route,
    params?: UrlParams
  ) => ReturnType<typeof apiGet<Data>>
  post: <Data = any>(
    route: Route,
    params: object
  ) => ReturnType<typeof apiPost<Data>>
  revalidate: (route: Route) => Promise<any>
}

interface BackendProviderProps {
  children: ReactNode
}

export const BackendProvider = ({ children }: BackendProviderProps) => {
  const { getAccessToken } = usePrivy()
  const { mutate } = useSWRConfig()

  const useGet = <Data = any,>(route: Route | null, params: UrlParams = {}) => {
    return useAPIGet<Data>(route, params, getAccessToken)
  }

  const useMutate = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, 'POST', getAccessToken)
  }

  const useDelete = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, 'DELETE', getAccessToken)
  }

  const get = <Data = any,>(route: Route, params: UrlParams = {}) => {
    return apiGet<Data>(route, params, getAccessToken)
  }

  const post = <Data = any,>(route: Route, params: object = {}) => {
    return apiPost<Data>(route, params, getAccessToken)
  }

  const revalidate = (route: Route): Promise<any> => {
    return mutate(route ? expandRoute(route) : null)
  }

  const state = {
    useGet,
    useMutate,
    useDelete,
    get,
    post,
    revalidate,
  }

  return (
    <BackendContext.Provider value={state}>{children}</BackendContext.Provider>
  )
}
