import { Feature } from '@/fauna/lib/features'
import { useCallback } from 'react'
import { useUser } from '../auth/useUser'

export const useFeatures = () => {
  const { user } = useUser()
  const hasFeature = useCallback(
    (feature: Feature) => {
      return user?.features?.includes(feature)
    },
    [user]
  )

  return { hasFeature }
}
