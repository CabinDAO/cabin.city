import { Feature } from '@/lib/features'
import { useCallback } from 'react'
import { useUser } from '../auth/useUser'

export const useFeatures = () => {
  const { user } = useUser()
  const hasFeature = useCallback(
    (feature: Feature) => {
      return (
        user?.features?.includes(feature) ||
        process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      )
    },
    [user]
  )

  return { hasFeature }
}
