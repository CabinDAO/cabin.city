import { useContext, createContext, ReactNode } from 'react'
import { useSWRConfig } from 'swr'
import { usePrivy } from '@privy-io/react-auth'
import { expandApiRoute, ApiRoute } from '@/utils/routing'
import { APIError, Paginated } from '@/utils/types/shared'
import {
  UrlParams,
  apiGet,
  apiPost,
  useAPIGet,
  useAPIMutate,
  useAPIGetPaginated,
  PaginationOptions,
} from '@/utils/api/backend'

/*
NOTES TO MYSELF:

- think of SWR much more as a cache. it fetches and stores data for keys, and reports its own state
- make sure your URLs correspond to cache keys
- isLoading only happens once, the very first time data is loaded into the cache
- isValidating happens every time data is being updated (aka revalidated)

 */

type BackendState = {
  useGet: <Data>(
    route: ApiRoute | null,
    params?: UrlParams
  ) => ReturnType<typeof useAPIGet<Data>>
  useGetPaginated: <Data extends Paginated | APIError>(
    route: ApiRoute,
    params?: UrlParams,
    options?: PaginationOptions
  ) => ReturnType<typeof useAPIGetPaginated<Data>>
  useMutate: <Data>(
    route: ApiRoute | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  useDelete: <Data>(
    route: ApiRoute | null
  ) => ReturnType<typeof useAPIMutate<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  get: <Data = any>(
    route: ApiRoute,
    params?: UrlParams
  ) => ReturnType<typeof apiGet<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  post: <Data = any>(
    route: ApiRoute,
    params: object
  ) => ReturnType<typeof apiPost<Data>>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  revalidate: (route: ApiRoute) => Promise<any>
}

const context = createContext<BackendState | null>(null)

export const BackendProvider = ({ children }: { children: ReactNode }) => {
  const { getAccessToken } = usePrivy()
  const { mutate } = useSWRConfig()

  const useGet = <Data,>(route: ApiRoute | null, params: UrlParams = {}) => {
    return useAPIGet<Data>(route, params, getAccessToken)
  }

  const useGetPaginated = <Data extends Paginated | APIError>(
    route: ApiRoute,
    params: UrlParams = {},
    options?: PaginationOptions
  ) => {
    return useAPIGetPaginated<Data>(route, params, getAccessToken, options)
  }

  const useMutate = <Data,>(route: ApiRoute | null) => {
    return useAPIMutate<Data>(route, 'POST', getAccessToken)
  }

  const useDelete = <Data,>(route: ApiRoute | null) => {
    return useAPIMutate<Data>(route, 'DELETE', getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const get = <Data = any,>(route: ApiRoute, params: UrlParams = {}) => {
    return apiGet<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const post = <Data = any,>(route: ApiRoute, params: object = {}) => {
    return apiPost<Data>(route, params, getAccessToken)
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const revalidate = (route: ApiRoute): Promise<any> => {
    return mutate(route ? expandApiRoute(route) : null)
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
