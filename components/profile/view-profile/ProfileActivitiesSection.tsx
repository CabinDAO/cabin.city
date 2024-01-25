import { ContentCard } from '@/components/core/ContentCard'
import { HorizontalDivider } from '@/components/core/Divider'
import { Post } from '@/components/core/post/Post'
import { H3 } from '@/components/core/Typography'
import { useActivityReactions } from '@/components/dashboard/useActivityReactions'
import styled from 'styled-components'
import { ActivityListFragment } from '@/utils/types/activity'

interface ProfileActivitiesSectionProps {
  activityItems: ActivityListFragment[]
}

export const ProfileActivitiesSection = ({
  activityItems,
}: ProfileActivitiesSectionProps) => {
  const baseDate = new Date()

  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  if (activityItems.length === 0) {
    return null
  }

  return (
    <StyledContentCard shape="notch">
      <SectionTitle>
        <H3>Activity</H3>
      </SectionTitle>
      <StyledDivider />
      <InnerContainer>
        {activityItems.map((a) => (
          <Post
            variant="compact"
            key={a.externId}
            activity={a}
            baseDate={baseDate}
            onLike={() => handleLikeActivity(a)}
            onUnlike={() => handleUnlikeActivity(a)}
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
