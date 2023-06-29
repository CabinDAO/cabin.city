import { addSeconds, isAfter, parseISO } from 'date-fns'
import { FAUNA_TOKEN_LOCAL_STORAGE_KEY } from './constants'
import { getAccessToken } from '@privy-io/react-auth'

/**
 * Retrieves the Fauna secret from localStorage if it is not expired.
 * Otherwise, fetches a new secret from the API.
 */
export async function getFaunaSecret() {
  const localStorageToken = localStorage.getItem(FAUNA_TOKEN_LOCAL_STORAGE_KEY)
  if (localStorageToken) {
    const token = JSON.parse(localStorageToken)
    const expiration = token.accessToken.ttl['@ts']
    const isExpired = isAfter(addSeconds(new Date(), 30), parseISO(expiration))

    if (!isExpired) {
      return token.accessToken.secret
    } else {
      console.info('Token expired, fetching new token')
    }
  }

  const authToken = await getAccessToken()

  if (!authToken) {
    return
  }

  const resp = await fetch('/api/auth/fauna-token', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  if (resp.status === 200) {
    const token = await resp.json()
    localStorage.setItem(FAUNA_TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(token))
    return token.accessToken.secret
  }
}
