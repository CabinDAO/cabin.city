import { createContext, ReactNode, useCallback, useEffect, useRef } from 'react'
import { useUser } from '../auth/useUser'
import { useExternalUser } from '../auth/useExternalUser'
import { useRouter } from 'next/router'
import { useBackend } from '@/components/hooks/useBackend'
import { RefetchParamsType, RefetchResponse } from '@/utils/types/unlock'
import { Address } from 'viem'

export const CitizenshipContext = createContext<CitzenshipState | null>(null)

export interface CitzenshipState {
  checkStatus: VoidFunction
}

interface CitzenshipProviderProps {
  children: ReactNode
}

const allowCheckPages = [
  '/activity',
  '/citizenship',
  '/profile',
  '/profile/[id]',
]

export const CitizenshipProvider = ({ children }: CitzenshipProviderProps) => {
  const { refetchUser } = useUser()
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
      address: externalUser.wallet.address.toLowerCase() as Address,
    } satisfies RefetchParamsType)

    if (!resp || 'error' in resp) {
      if ('error' in resp) console.log(resp.error)
      return
    }

    if (resp.updated) {
      await refetchUser()
    }
    checked.current = true
  }, [refetchUser, externalUser, get, pathname])

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
