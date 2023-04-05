import { useContext } from 'react'
import { CitizenshipContext } from '../contexts/CitizenshipContext'

export function useCitizenship() {
  const context = useContext(CitizenshipContext)
  if (!context) {
    throw new Error(
      'useCitizenship must be used within CitizenshipContext. Wrap a parent component in <CitizenshipContext.Provider> to fix this error.'
    )
  }
  return context
}
