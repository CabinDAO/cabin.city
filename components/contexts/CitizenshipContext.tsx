import { createContext, ReactNode, useCallback, useEffect, useRef } from 'react'
import { useUser } from '../auth/useUser'

export const CitizenshipContext = createContext<CitzenshipState | null>(null)

export interface CitzenshipState {
  checkStatus: () => void
}

interface CitzenshipProviderProps {
  children: ReactNode
}

export const CitizenshipProvider = ({ children }: CitzenshipProviderProps) => {
  const { user, refetchUser } = useUser()
  const checked = useRef(false)

  // Can be used to check if the user's citizenship status has changed
  // Useful for when the user interacts with the Unlock modal
  const checkStatus = useCallback(async () => {
    const resp = await fetch('/api/unlock/check-status')
    if (resp.ok) {
      const { updated } = await resp.json()
      if (updated) {
        console.log('Status updated. Refetching user...')
        await refetchUser()
      }
      checked.current = true
    }
  }, [refetchUser])

  useEffect(() => {
    if (!user || checked.current) {
      return
    }

    // Check status on initial app load but only one time
    checkStatus()
  }, [user, checkStatus])

  const state = {
    checkStatus,
  }

  return (
    <CitizenshipContext.Provider value={state}>
      {children}
    </CitizenshipContext.Provider>
  )
}
