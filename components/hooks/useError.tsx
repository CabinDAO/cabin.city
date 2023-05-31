import { useContext } from 'react'
import { ErrorContext } from '../contexts/ErrorContext'

export function useError() {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error(
      'useError must be used within ErrorContext. Wrap a parent component in <ErrorContext.Provider> to fix this error.'
    )
  }
  return context
}
