import { useCallback } from 'react'
import { useUser } from './useUser'
import { useModal } from '../hooks/useModal'
import { LoginModal } from './LoginModal'

export const useConfirmLoggedIn = () => {
  const { user, isUserLoading } = useUser()
  const { showLoadingModal } = useModal()

  const confirmLoggedIn = useCallback(
    (onConfirmed?: () => void) => {
      if (!user && !isUserLoading) {
        showLoadingModal(() => <LoginModal onLogin={onConfirmed} />)
      } else if (user) {
        onConfirmed?.()
      }
    },
    [showLoadingModal, user, isUserLoading]
  )

  return {
    confirmLoggedIn,
  }
}
