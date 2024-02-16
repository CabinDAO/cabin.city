import { ContentCard } from '@/components/core/ContentCard'
import { HorizontalDivider } from '@/components/core/Divider'
import { Post } from '@/components/core/post/Post'
import { H3 } from '@/components/core/Typography'
import { useActivityReactions } from '@/components/dashboard/useActivityReactions'
import styled from 'styled-components'
import { ActivityListResponse } from '@/utils/types/activity'
import { ProfileFragment } from '@/utils/types/profile'
import { useBackend } from '@/components/hooks/useBackend'

export const ProfileActivitiesSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  const baseDate = new Date()

  const { useGet } = useBackend()
  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  const { data, mutate: refetchActivities } = useGet<ActivityListResponse>(
    profile ? 'ACTIVITY_LIST' : null,
    { profileId: profile?.externId, pageSize: 10 }
  )

  const activities = data && 'activities' in data ? data.activities : []

  if (activities.length === 0) {
    return null
  }

  return (
    <StyledContentCard shape="notch">
      <SectionTitle>
        <H3>Activity</H3>
      </SectionTitle>
      <StyledDivider />
      <InnerContainer>
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
      </InnerContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
`

const StyledDivider = styled(HorizontalDivider)`
  opacity: 1;
`

const SectionTitle = styled.div`
  display: flex;
  padding: 2.4rem;
`

const InnerContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`
