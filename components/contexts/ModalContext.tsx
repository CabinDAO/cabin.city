import { createContext, ReactNode, useCallback, useState } from 'react'
import Modal from '@/components/core/modals/Modal'

export const ModalContext = createContext<ModalState | null>(null)

export interface ModalState {
  showModal: (render: () => ReactNode) => void
  showLoadingModal: (render: () => ReactNode) => void
  hideModal: VoidFunction
  active: boolean
}

interface ModalProviderProps {
  children: ReactNode
}

interface InternalState {
  render: (() => ReactNode) | null
  hideOnClickAway?: boolean
}

const initialState: InternalState = {
  render: null,
  hideOnClickAway: true,
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [internalState, setInternalState] =
    useState<InternalState>(initialState)

  const showModal = useCallback((render: () => ReactNode) => {
    setInternalState({ render, hideOnClickAway: true })
  }, [])

  // Shows a modal but disables close on click away
  const showLoadingModal = useCallback((render: () => ReactNode) => {
    setInternalState({ render, hideOnClickAway: false })
  }, [])

  const hideModal = useCallback(() => {
    setInternalState({ render: null, hideOnClickAway: true })
  }, [])

  const state = {
    showModal,
    hideModal,
    showLoadingModal,
    active: !!internalState.render,
  }

  return (
    <ModalContext.Provider value={state}>
      {children}
      <Modal
        active={!!internalState.render}
        onClose={hideModal}
        hideOnClickAway={internalState.hideOnClickAway}
      >
        {internalState.render && internalState.render()}
      </Modal>
    </ModalContext.Provider>
  )
}
