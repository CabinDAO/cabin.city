import events from '@/lib/googleAnalytics/events'
import {
  ActivityReactResponse,
  ActivityListFragment,
} from '@/utils/types/activity'
import { useBackend } from '@/components/hooks/useBackend'

export const useActivityReactions = () => {
  const { post } = useBackend()

  const handleLikeActivity = async (activity: ActivityListFragment) => {
    events.reactToPostEvent(`${activity.externId}`, 'like')

    await post<ActivityReactResponse>('ACTIVITY_REACT', {
      externId: activity.externId,
      action: 'like',
    })
  }

  const handleUnlikeActivity = async (activity: ActivityListFragment) => {
    events.reactToPostEvent(`${activity.externId}`, 'like')

    await post<ActivityReactResponse>('ACTIVITY_REACT', {
      externId: activity.externId,
      action: 'unlike',
    })
  }

  return {
    handleLikeActivity,
    handleUnlikeActivity,
  }
}
