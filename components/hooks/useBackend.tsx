import { useContext, createContext, ReactNode } from 'react'
import { useSWRConfig } from 'swr'
import { usePrivy } from '@privy-io/react-auth'
import { expandRoute, Route } from '@/utils/routes'
import { APIError, Paginated } from '@/utils/types/shared'
import {
  UrlParams,
  apiGet,
  apiPost,
  useAPIGet,
  useAPIMutate,
  useAPIGetPaginated,
} from '@/utils/api/backend'

/*
NOTES TO MYSELF:

- think of SWR much more as a cache. it fetches and stores data for keys, and reports its own state
- make sure your URLs correspond to cache keys
- isLoading only happens once, the very first time data is loaded into the cache
- isValidating happens every time data is being updated (aka revalidated)

 */

type BackendState = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useGet: <Data = any>(
    route: Route | null,
    params?: UrlParams
  ) => ReturnType<typeof useAPIGet<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useGetPaginated: <Data extends Paginated | APIError = any>(
    route: Route,
    params?: UrlParams
  ) => ReturnType<typeof useAPIGetPaginated<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useMutate: <Data = any>(
    route: Route | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useDelete: <Data = any>(
    route: Route | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  get: <Data = any>(
    route: Route,
    params?: UrlParams
  ) => ReturnType<typeof apiGet<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  post: <Data = any>(
    route: Route,
    params: object
  ) => ReturnType<typeof apiPost<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  revalidate: (route: Route) => Promise<any>
}

const context = createContext<BackendState | null>(null)

export const BackendProvider = ({ children }: { children: ReactNode }) => {
  const { getAccessToken } = usePrivy()
  const { mutate } = useSWRConfig()

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const useGet = <Data = any,>(route: Route | null, params: UrlParams = {}) => {
    return useAPIGet<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const useGetPaginated = <Data extends Paginated | APIError = any>(
    route: Route,
    params: UrlParams = {}
  ) => {
    return useAPIGetPaginated<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const useMutate = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, 'POST', getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const useDelete = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, 'DELETE', getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const get = <Data = any,>(route: Route, params: UrlParams = {}) => {
    return apiGet<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const post = <Data = any,>(route: Route, params: object = {}) => {
    return apiPost<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const revalidate = (route: Route): Promise<any> => {
    return mutate(route ? expandRoute(route) : null)
  }

  const state = {
    useGet,
    useGetPaginated,
    useMutate,
    useDelete,
    get,
    post,
    revalidate,
  }

  return <context.Provider value={state}>{children}</context.Provider>
}

export const useBackend = () => {
  const c = useContext(context)
  if (!c) {
    throw new Error(
      'useBackend must be used within context. Wrap a parent component in <context.Provider> to fix this error.'
    )
  }
  return c
}
