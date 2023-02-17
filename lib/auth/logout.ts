import { disconnect } from '@wagmi/core'
import { FAUNA_TOKEN_LOCAL_STORAGE_KEY } from './constants'

export async function logOut() {
  const resp = await fetch('/api/auth/logout')
  if (resp.status === 200) {
    await disconnect()
    localStorage.setItem(FAUNA_TOKEN_LOCAL_STORAGE_KEY, '')
  }
}
