import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ErrorToast } from '../core/toasts/ErrorToast'

export const ErrorContext = createContext<ErrorState | null>(null)

export interface ErrorState {
  showError: (message: string) => void
}

interface ErrorProviderProps {
  children: ReactNode
}

interface InternalState {
  active: boolean
  hideOnClickAway?: boolean
  message?: string
}

const initialState: InternalState = {
  active: false,
  hideOnClickAway: true,
  message: '',
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [internalState, setInternalState] =
    useState<InternalState>(initialState)

  const showError = useCallback((message: string) => {
    setInternalState({ hideOnClickAway: true, active: true, message })
  }, [])

  useEffect(() => {
    if (internalState.active) {
      const timeout = setTimeout(() => {
        setInternalState({ ...internalState, active: false })
      }, 5000)

      return () => {
        clearTimeout(timeout)
        setInternalState(initialState)
      }
    }
  }, [internalState])

  const state = {
    showError,
    active: !!internalState.active,
  }

  return (
    <ErrorContext.Provider value={state}>
      {children}
      {internalState.message && (
        <ErrorToast
          key={internalState.message}
          message={internalState.message}
          visible={internalState.active}
        />
      )}
    </ErrorContext.Provider>
  )
}
