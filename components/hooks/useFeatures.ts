import { Feature } from '@/lib/features'
import { useCallback } from 'react'
import { useProfile } from '../auth/useProfile'

export const useFeatures = () => {
  const { user } = useProfile()
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
