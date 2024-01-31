import {
  GetProfileByIdDocument,
  useCreateTextActivityMutation,
  useDeleteActivityMutation,
} from '@/generated/graphql'
import { useCallback } from 'react'
import { useProfile } from '../auth/useProfile'

export const useTextActivity = () => {
  const [createTextActivity] = useCreateTextActivityMutation()
  const [deleteTextActivity] = useDeleteActivityMutation()
  const { user } = useProfile()

  const handleCreateTextActivity = useCallback(
    (text: string) => {
      createTextActivity({
        variables: {
          text,
        },
        refetchQueries: [
          'GetActivities',
          {
            query: GetProfileByIdDocument,
            variables: { id: user?.externId },
          },
        ],
      })
    },
    [createTextActivity, user?.externId]
  )

  const handleDeleteTextActivity = useCallback(
    (activityId: string) => {
      deleteTextActivity({
        variables: {
          id: activityId,
        },
        refetchQueries: [
          'GetActivities',
          {
            query: GetProfileByIdDocument,
            variables: { id: user?.externId },
          },
        ],
      })
    },
    [deleteTextActivity, user?.externId]
  )

  return {
    handleCreateTextActivity,
    handleDeleteTextActivity,
  }
}
