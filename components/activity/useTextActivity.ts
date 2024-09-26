import { useCallback } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { ActivityNewParams, ActivityNewResponse } from '@/utils/types/activity'

export const useTextActivity = (
  afterPost: VoidFunction,
  activityId?: string
) => {
  const { useMutate, useDelete } = useBackend()

  const { trigger: createTextActivity } =
    useMutate<ActivityNewResponse>('api_activity_new')

  const handleCreateTextActivity = useCallback(
    async (text: string) => {
      await createTextActivity({ text: text } satisfies ActivityNewParams)
      await afterPost()
    },
    [createTextActivity, afterPost]
  )

  const { trigger: deleteTextActivity } = useDelete(
    activityId ? ['api_activity_externId', { externId: activityId }] : null
  )

  const handleDeleteTextActivity = useCallback(async () => {
    await deleteTextActivity({})
    await afterPost()
  }, [deleteTextActivity, afterPost])

  return {
    handleCreateTextActivity,
    handleDeleteTextActivity,
  }
}
