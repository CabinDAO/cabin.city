import {
  ActivityItemFragment,
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
      })
    },
    [unlikeActivity]
  )

  return {
    handleLikeActivity,
    handleUnlikeActivity,
  }
}
