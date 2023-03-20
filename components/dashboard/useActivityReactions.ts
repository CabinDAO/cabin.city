import {
  ActivityItemFragment,
  GetProfileByIdDocument,
  useLikeActivityMutation,
  useUnlikeActivityMutation,
} from '@/generated/graphql'
import { useCallback } from 'react'

export const useActivityReactions = () => {
  const [likeActivity] = useLikeActivityMutation()
  const [unlikeActivity] = useUnlikeActivityMutation()

  const handleLikeActivity = useCallback(
    (activityItem: ActivityItemFragment) => {
      likeActivity({
        variables: {
          id: activityItem.activity._id,
        },
        refetchQueries: [
          'GetActivities',
          {
            query: GetProfileByIdDocument,
            variables: { id: activityItem.activity.profile._id },
          },
        ],
      })
    },
    [likeActivity]
  )

  const handleUnlikeActivity = useCallback(
    (activityItem: ActivityItemFragment) => {
      unlikeActivity({
        variables: {
          id: activityItem.activity._id,
        },
        refetchQueries: [
          'GetActivities',
          {
            query: GetProfileByIdDocument,
            variables: { id: activityItem.activity.profile._id },
          },
        ],
      })
    },
    [unlikeActivity]
  )

  return {
    handleLikeActivity,
    handleUnlikeActivity,
  }
}
