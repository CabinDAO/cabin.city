import analytics from '@/lib/googleAnalytics/analytics'
import {
  ActivityReactResponse,
  ActivityListFragment,
} from '@/utils/types/activity'
import { useBackend } from '@/components/hooks/useBackend'

export const useActivityReactions = () => {
  const { post } = useBackend()

  const handleLikeActivity = async (activity: ActivityListFragment) => {
    analytics.reactToPostEvent(`${activity.externId}`, 'like')

    await post<ActivityReactResponse>('api_activity_react', {
      externId: activity.externId,
      action: 'like',
    })
  }

  const handleUnlikeActivity = async (activity: ActivityListFragment) => {
    analytics.reactToPostEvent(`${activity.externId}`, 'like')

    await post<ActivityReactResponse>('api_activity_react', {
      externId: activity.externId,
      action: 'unlike',
    })
  }

  return {
    handleLikeActivity,
    handleUnlikeActivity,
  }
}
