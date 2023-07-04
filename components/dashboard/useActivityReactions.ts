import {
  ActivityItemFragment,
  useLikeActivityMutation,
  useUnlikeActivityMutation,
} from '@/generated/graphql'
import events from '@/lib/googleAnalytics/events'
import { useCallback } from 'react'

export const useActivityReactions = () => {
  const [likeActivity] = useLikeActivityMutation()
  const [unlikeActivity] = useUnlikeActivityMutation()

  const handleLikeActivity = useCallback(
    (activityItem: ActivityItemFragment) => {
      events.reactToPostEvent(activityItem.activity._id, 'like')

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
      events.reactToPostEvent(activityItem.activity._id, 'unlike')

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
