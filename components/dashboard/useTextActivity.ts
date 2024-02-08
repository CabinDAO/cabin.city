import { useCallback } from 'react'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { ActivityNewParams, ActivityNewResponse } from '@/utils/types/activity'

export const useTextActivity = (activityId?: string) => {
  const { refetchProfile } = useProfile()
  const { useMutate, useDelete } = useBackend()

  const { trigger: createTextActivity } =
    useMutate<ActivityNewResponse>('ACTIVITY_NEW')

  const handleCreateTextActivity = useCallback(
    async (text: string) => {
      await createTextActivity({ text: text } as ActivityNewParams)
      await refetchProfile()
    },
    [createTextActivity, refetchProfile]
  )

  const { trigger: deleteTextActivity } = useDelete(
    activityId ? ['ACTIVITY', { externId: activityId }] : null
  )

  const handleDeleteTextActivity = useCallback(async () => {
    await deleteTextActivity({})
    await refetchProfile()
  }, [deleteTextActivity, refetchProfile])

  return {
    handleCreateTextActivity,
    handleDeleteTextActivity,
  }
}
