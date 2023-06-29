import { useEffect } from 'react'
import { useProfile } from './useProfile'
import { useExternalUser } from './useExternalUser'

export const Reload = () => {
  const { refetchProfile } = useProfile()
  const { externalUser, isUserLoading } = useExternalUser()

  useEffect(() => {
    if (externalUser && !isUserLoading) {
      refetchProfile()
    }
  }, [externalUser, isUserLoading, refetchProfile])

  return null
}
