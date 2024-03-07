import { createContext, ReactNode, useCallback, useEffect, useRef } from 'react'
import { useProfile } from '../auth/useProfile'
import { useExternalUser } from '../auth/useExternalUser'
import { useRouter } from 'next/router'
import { useBackend } from '@/components/hooks/useBackend'
import { RefetchParams, RefetchResponse } from '@/utils/types/unlock'

export const CitizenshipContext = createContext<CitzenshipState | null>(null)

export interface CitzenshipState {
  checkStatus: VoidFunction
}

interface CitzenshipProviderProps {
  children: ReactNode
}

const allowCheckPages = [
  '/dashboard',
  '/citizenship',
  '/profile',
  '/profile/[id]',
]

export const CitizenshipProvider = ({ children }: CitzenshipProviderProps) => {
  const { refetchProfile } = useProfile()
  const { externalUser } = useExternalUser()
  const checked = useRef(false)
  const { pathname } = useRouter()
  const { get } = useBackend()

  // Can be used to check if the user's citizenship status has changed
  // Useful for when the user interacts with the Unlock modal
  const checkStatus = useCallback(async () => {
    if (!externalUser?.wallet?.address || !allowCheckPages.includes(pathname)) {
      return
    }

    const resp = await get<RefetchResponse>('UNLOCK_REFETCH_STATUS', {
      address: externalUser?.wallet?.address,
    } as RefetchParams)

    if (resp.hasOwnProperty('updated')) {
      if (resp.updated) {
        console.log('Status updated. Refetching user...')
        await refetchProfile()
      }
      checked.current = true
    }
  }, [refetchProfile, externalUser, get, pathname])

  useEffect(() => {
    if (!externalUser || checked.current) {
      return
    }

    // Check status on initial app load but only one time
    checkStatus().then()
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
