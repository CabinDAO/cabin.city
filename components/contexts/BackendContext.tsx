import { createContext, ReactNode, useEffect } from 'react'
import { mutate } from 'swr'
import { usePrivy } from '@privy-io/react-auth'
import { API_TOKEN_LOCAL_STORAGE_KEY } from '@/lib/auth/constants'
import { addSeconds, isAfter, parseISO } from 'date-fns'
import { useLocalStorage } from 'react-use'
import { Route } from '@/utils/routes'
import {
  apiGet,
  apiPost,
  UrlParams,
  useAPIGet,
  useAPIMutate,
  useAPIPost,
} from '@/utils/api/interface'

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

type AuthData = {
  did: string
  jwt: string
}

export const BackendProvider = ({ children }: BackendProviderProps) => {
  const { getAccessToken, authenticated, ready, user } = usePrivy()
  const [apiToken, setApiToken, removeApiToken] = useLocalStorage<string>(
    API_TOKEN_LOCAL_STORAGE_KEY
  )

  useEffect(() => {
    const storeAuthTokenLocally = async (authenticated: boolean) => {
      if (!authenticated || !user) {
        removeApiToken()
        return
      }

      const authToken = await getAccessToken()
      if (!authToken) {
        console.log('Error: access token is null but it should not be')
        return
      }

      const authData: AuthData = {
        did: user?.id,
        jwt: authToken,
      }

      setApiToken(JSON.stringify(authData))
    }

    if (ready) {
      storeAuthTokenLocally(authenticated).then()
    }
  }, [ready, authenticated, user])

  const getToken = () => {
    if (apiToken) {
      const data: AuthData = JSON.parse(apiToken)
      return data.jwt

      // TODO: detect expiration and renew token

      // const expiration = token.accessToken.ttl['@ts']
      // const isExpired = isAfter(
      //   addSeconds(new Date(), 30),
      //   parseISO(expiration)
      // )
      //
      // if (!isExpired) {
      //   return token.accessToken.secret
      // } else {
      //   console.info('Token expired, fetching new token')
      // }
    }

    return null
  }

  const useGet = <Data = any,>(route: Route | null, params: UrlParams = {}) => {
    return useAPIGet<Data>(route, params, getToken())
  }

  const usePost = <Data = any,>(route: Route | null, params: object = {}) => {
    return useAPIPost<Data>(route, params, getToken())
  }

  const useMutate = <Data = any,>(route: Route | null) => {
    return useAPIMutate<Data>(route, getToken())
  }

  const get = <Data = any,>(route: Route, params: UrlParams = {}) => {
    return apiGet<Data>(route, params, getToken())
  }

  const post = <Data = any,>(route: Route, params: object = {}) => {
    return apiPost<Data>(route, params, getToken())
  }

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
