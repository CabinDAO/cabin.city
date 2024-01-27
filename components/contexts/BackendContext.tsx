import { createContext, ReactNode, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { API_TOKEN_LOCAL_STORAGE_KEY } from '@/lib/auth/constants'
import { addSeconds, isAfter, parseISO } from 'date-fns'
import { useLocalStorage } from 'react-use'
import { Route } from '@/utils/routes'
import { UrlParams, useAPIGet, useAPIPost } from '@/utils/api/interface'

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
      console.log('auth data is', data)
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

  const state = {
    useGet,
    usePost,
  }

  return (
    <BackendContext.Provider value={state}>{children}</BackendContext.Provider>
  )
}
