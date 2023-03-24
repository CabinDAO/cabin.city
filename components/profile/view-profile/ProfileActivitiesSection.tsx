import { ContentCard } from '@/components/core/ContentCard'
import { HorizontalDivider } from '@/components/core/Divider'
import { Post } from '@/components/core/post/Post'
import { H3 } from '@/components/core/Typography'
import { useActivityReactions } from '@/components/dashboard/useActivityReactions'
import { ActivityItemFragment } from '@/generated/graphql'
import styled from 'styled-components'

interface ProfileActivitiesSectionProps {
  activityItems: ActivityItemFragment[]
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
        {activityItems.map((activityItem) => (
          <Post
            excludeProfile
            key={activityItem.activity._id}
            activityItem={activityItem}
            baseDate={baseDate}
            onLike={() => handleLikeActivity(activityItem)}
            onUnlike={() => handleUnlikeActivity(activityItem)}
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
