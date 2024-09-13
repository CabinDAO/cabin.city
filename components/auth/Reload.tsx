import { useEffect } from 'react'
import { useUser } from './useUser'
import { useExternalUser } from './useExternalUser'

export const Reload = () => {
  const { refetchUser } = useUser()
  const { externalUser, isUserLoading } = useExternalUser()

  useEffect(() => {
    if (externalUser && !isUserLoading) {
      refetchUser()
    }
  }, [externalUser, isUserLoading, refetchUser])

  return null
}
