import { useContext } from 'react'
import { BackendContext } from '@/components/contexts/BackendContext'

export const useBackend = () => {
  const context = useContext(BackendContext)
  if (!context) {
    throw new Error(
      'useBackend must be used within BackendContext. Wrap a parent component in <BackendContext.Provider> to fix this error.'
    )
  }
  return context
}
