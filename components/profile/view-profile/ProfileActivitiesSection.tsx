import { useActivityReactions } from '@/components/activity/useActivityReactions'
import { useBackend } from '@/components/hooks/useBackend'
import { ActivityListResponse, ActivityType } from '@/utils/types/activity'
import { ProfileFragment } from '@/utils/types/profile'
import { randomId } from '@/utils/random'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { HorizontalDivider } from '@/components/core/Divider'
import { Post } from '@/components/core/post/Post'
import { H3 } from '@/components/core/Typography'

export const ProfileActivitiesSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  const baseDate = new Date()

  const { useGet } = useBackend()
  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  const { data, mutate: refetchActivities } = useGet<ActivityListResponse>(
    'ACTIVITY_LIST',
    { profileId: profile?.externId, pageSize: 1000 }
  )

  const activities = data && 'activities' in data ? data.activities : []

  if (activities.length === 0) {
    return null
  }

  return (
    <StyledContentCard shape="notch">
      <Top>
        <H3>Activity</H3>
        {activities.length > 1 && <HorizontalDivider />}
      </Top>
      <Posts>
        {activities.map((a) => (
          <Post
            variant="compact"
            key={a.externId}
            activity={a}
            baseDate={baseDate}
            onLike={() => handleLikeActivity(a)}
            onUnlike={() => handleUnlikeActivity(a)}
            onDelete={refetchActivities}
          />
        ))}
      </Posts>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem 2.4rem 0;
`

const Posts = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`
