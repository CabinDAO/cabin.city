import { useContext } from 'react'
import { ModalContext } from '../contexts/ModalContext'

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error(
      'useModal must be used within ModalContext. Wrap a parent component in <ModalContext.Provider> to fix this error.'
    )
  }
  return context
}
