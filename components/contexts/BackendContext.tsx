import { createContext, ReactNode } from 'react'
import { mutate } from 'swr'
import { usePrivy } from '@privy-io/react-auth'
import { Route } from '@/utils/routes'
import {
  UrlParams,
  apiGet,
  apiPost,
  useAPIGet,
  useAPIMutate,
  useAPIPost,
} from '@/utils/api/backend'

export const BackendContext = createContext<BackendState | null>(null)

export interface BackendState {
  useGet: <Data = any>(
    route: Route | null,
    params?: UrlParams
  ) => ReturnType<typeof useAPIGet<Data>>
  usePost: <Data = any>(
    route: Route | null,
    params: object
  ) => ReturnType<typeof useAPIPost<Data>>
  useMutate: <Data = any>(
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
  revalidate: (key: string) => Promise<any>
}

interface BackendProviderProps {
  children: ReactNode
}

export const BackendProvider = ({ children }: BackendProviderProps) => {
  const { getAccessToken } = usePrivy()

  const useGet = <Data = any,>(route: Route | null, params: UrlParams = {}) => {
    return useAPIGet<Data>(route, params, getAccessToken)
  }

  const usePost = <Data = any,>(route: Route | null, params: object = {}) => {
    return useAPIPost<Data>(route, params, getAccessToken)
  }

  const useMutate = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, getAccessToken)
  }

  const get = <Data = any,>(route: Route, params: UrlParams = {}) => {
    return apiGet<Data>(route, params, getAccessToken)
  }

  const post = <Data = any,>(route: Route, params: object = {}) => {
    return apiPost<Data>(route, params, getAccessToken)
  }

  //todo: unused?
  const revalidate = (key: string): Promise<any> => {
    return mutate(key)
  }

  const state = {
    useGet,
    usePost,
    useMutate,
    get,
    post,
    revalidate,
  }

  return (
    <BackendContext.Provider value={state}>{children}</BackendContext.Provider>
  )
}
