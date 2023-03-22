import { ContentCard } from '../../core/ContentCard'
import styled from 'styled-components'
import { H2, Overline } from '../../core/Typography'
import { ProgressBar } from '../../core/ProgressBar'
import { ColorName } from '@/styles/theme'
import Icon from '../../core/Icon'
import { useRouter } from 'next/router'
import { MeFragment, useLogTrackingEventMutation } from '@/generated/graphql'
import { hasEventOccurred, TrackingEvent } from '@/lib/tracking-events'

interface ProfileProgressCardProps {
  progress: number
  profileId: string
  me: MeFragment
}

export const ProfileProgressCardSection = ({
  progress,
  profileId,
  me,
}: ProfileProgressCardProps) => {
  const router = useRouter()
  const [logTrackingEvent] = useLogTrackingEventMutation()

  if (!me) return null

  const complete = progress === 100
  const hasDismissed = hasEventOccurred(
    me,
    TrackingEvent.profile_setup_dismissed
  )

  if (hasDismissed) return null

  const handleSetupClick = () => {
    router.push(`/profile/${profileId}/setup`)
  }

  const handleDismissClick = () => {
    logTrackingEvent({
      variables: {
        key: TrackingEvent.profile_setup_dismissed,
      },
    })
  }

  return (
    <ContentCard fillType="hard" notchSize={1.6} shape="notch">
      <InnerContainer>
        <ProfileCompletionData>
          <ProfileProgressData>
            <H2 $color="yellow100">Profile progress</H2>
            <H2 $color="yellow100">{progress}% Complete</H2>
          </ProfileProgressData>
          {!complete ? (
            <LinkContainer color="yellow100" onClick={handleSetupClick}>
              <Overline>Setup profile</Overline>
              <Icon name="chevron-right" size={1.4} color="yellow100" />
            </LinkContainer>
          ) : (
            <LinkContainer color="yellow100" onClick={handleDismissClick}>
              <Overline>Dismiss</Overline>
              <Icon name="close" size={1.4} color="yellow100" />
            </LinkContainer>
          )}
        </ProfileCompletionData>
        <ProgressBar progress={progress} />
      </InnerContainer>
    </ContentCard>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
  background-color: ${({ theme }) => theme.colors.green800};
  width: 100%;
`

const ProfileCompletionData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`

const ProfileProgressData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

interface LinkContainerProps {
  color: ColorName
}

const LinkContainer = styled.div<LinkContainerProps>`
  display: flex;
  flex-direction: row;
  gap: 0.85rem;
  cursor: pointer;

  > * {
    color: ${({ theme, color }) => theme.colors[color]};
  }

  ${Overline} {
    white-space: nowrap;
  }
`
