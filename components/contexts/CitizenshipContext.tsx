import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useUser } from '@/components/auth/useUser'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { useRouter } from '@/components/hooks/useRouter'
import { useBackend } from '@/components/hooks/useBackend'
import { RefetchParamsType, RefetchResponse } from '@/utils/types/unlock'
import { Address } from 'viem'

const allowCheckPages = [
  '/activity',
  '/citizenship',
  '/profile',
  '/profile/[id]',
]

interface CitzenshipState {
  checkStatus: VoidFunction
}

const CitizenshipContext = createContext<CitzenshipState | null>(null)

export function useCitizenship() {
  const context = useContext(CitizenshipContext)
  if (!context) {
    throw new Error(
      'useCitizenship must be used within CitizenshipContext. Wrap a parent component in <CitizenshipContext.Provider> to fix this error.'
    )
  }
  return context
}

export const CitizenshipProvider = ({ children }: { children: ReactNode }) => {
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

    const resp = await get<RefetchResponse>('api_unlock_refetchStatus', {
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
