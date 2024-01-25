import events from '@/lib/googleAnalytics/events'
import {
  ActivityReactResponse,
  ActivityListFragment,
} from '@/utils/types/activity'
import { apiPost } from '@/utils/api/interface'
import { getAccessToken } from '@privy-io/react-auth'

export const useActivityReactions = () => {
  const handleLikeActivity = async (activity: ActivityListFragment) => {
    const token = await getAccessToken()

    events.reactToPostEvent(`${activity.externId}`, 'like')

    await apiPost<ActivityReactResponse>(
      'ACTIVITY_REACT',
      { externId: activity.externId, action: 'like' },
      token
    )
  }

  const handleUnlikeActivity = async (activity: ActivityListFragment) => {
    const token = await getAccessToken()

    events.reactToPostEvent(`${activity.externId}`, 'like')

    await apiPost<ActivityReactResponse>(
      'ACTIVITY_REACT',
      { externId: activity.externId, action: 'unlike' },
      token
    )
  }

  return {
    handleLikeActivity,
    handleUnlikeActivity,
  }
}
