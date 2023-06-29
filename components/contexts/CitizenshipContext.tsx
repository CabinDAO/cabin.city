import { createContext, ReactNode, useCallback, useEffect, useRef } from 'react'
import { useProfile } from '../auth/useProfile'
import { useExternalUser } from '../auth/useExternalUser'
import { usePrivy } from '@privy-io/react-auth'

export const CitizenshipContext = createContext<CitzenshipState | null>(null)

export interface CitzenshipState {
  checkStatus: () => void
}

interface CitzenshipProviderProps {
  children: ReactNode
}

export const CitizenshipProvider = ({ children }: CitzenshipProviderProps) => {
  const { refetchProfile } = useProfile()
  const { externalUser } = useExternalUser()
  const checked = useRef(false)
  const { getAccessToken } = usePrivy()

  // Can be used to check if the user's citizenship status has changed
  // Useful for when the user interacts with the Unlock modal
  const checkStatus = useCallback(async () => {
    if (!externalUser?.wallet?.address) {
      return
    }

    const authToken = await getAccessToken()

    const resp = await fetch(
      `/api/unlock/check-status?address=${externalUser?.wallet?.address}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    if (resp.ok) {
      const { updated } = await resp.json()
      if (updated) {
        console.log('Status updated. Refetching user...')
        await refetchProfile()
      }
      checked.current = true
    }
  }, [refetchProfile, externalUser, getAccessToken])

  useEffect(() => {
    if (!externalUser || checked.current) {
      return
    }

    // Check status on initial app load but only one time
    checkStatus()
  }, [externalUser, checkStatus])

  const state = {
    checkStatus,
  }

  return (
    <CitizenshipContext.Provider value={state}>
      {children}
    </CitizenshipContext.Provider>
  )
}
