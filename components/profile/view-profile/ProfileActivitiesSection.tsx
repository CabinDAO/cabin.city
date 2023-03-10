import { ContentCard } from '@/components/core/ContentCard'
import { HorizontalDivider } from '@/components/core/Divider'
import { Post } from '@/components/core/post/Post'
import { H3 } from '@/components/core/Typography'
import { ActivityFragment } from '@/generated/graphql'
import styled from 'styled-components'

interface ProfileActivitiesSectionProps {
  activities: (ActivityFragment | null)[] | undefined
}

export const ProfileActivitiesSection = ({
  activities,
}: ProfileActivitiesSectionProps) => {
  const truthyActivities = activities?.filter((a): a is ActivityFragment => !!a)
  const baseDate = new Date()

  if (!truthyActivities) {
    return null
  }

  return (
    <StyledContentCard shape="notch">
      <SectionTitle>
        <H3>Actitiy</H3>
      </SectionTitle>
      <StyledDivider />
      <InnerContainer>
        {truthyActivities.map((activity) => (
          <Post
            excludeProfile
            key={activity._id}
            activity={activity}
            baseDate={baseDate}
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
