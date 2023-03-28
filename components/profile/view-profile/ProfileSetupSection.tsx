import { ContentCard } from '../../core/ContentCard'
import styled from 'styled-components'
import { Body2, H2, Overline } from '../../core/Typography'
import { ProgressBar } from '../../core/ProgressBar'
import { ColorName } from '@/styles/theme'
import Icon from '../../core/Icon'
import { useRouter } from 'next/router'
import { MeFragment, useLogTrackingEventMutation } from '@/generated/graphql'
import { hasEventOccurred, TrackingEvent } from '@/lib/tracking-events'
import { Button } from '@/components/core/Button'

interface ProfileSetupSectionProps {
  profileId: string
  me: MeFragment
}

export const ProfileSetupSection = ({
  profileId,
  me,
}: ProfileSetupSectionProps) => {
  const complete = hasEventOccurred(me, TrackingEvent.profile_setup_finished)
  const router = useRouter()
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const progress = complete ? 100 : 25

  if (!me) return null

  const hasDismissed = hasEventOccurred(
    me,
    TrackingEvent.profile_setup_dismissed
  )

  const hasShared = hasEventOccurred(me, TrackingEvent.profile_shared)

  const hasDismissedShare = hasEventOccurred(
    me,
    TrackingEvent.profile_share_dismissed
  )

  if ((hasDismissed && hasDismissedShare) || hasShared) return null

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

  const handleMaybeLaterClick = () => {
    logTrackingEvent({
      variables: {
        key: TrackingEvent.profile_share_dismissed,
      },
    })
  }

  const handleTwitterShareClick = () => {
    logTrackingEvent({
      variables: {
        key: TrackingEvent.profile_shared,
      },
    })

    const text = encodeURIComponent(
      `I'm live on @creatorcabins Community Census`
    )

    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  return (
    <ContentCard fillType="hard" notchSize={1.6} shape="notch">
      <InnerContainer>
        <ProfileCompletionData>
          <ProfileProgressData>
            {hasDismissed ? (
              <>
                <H2 $color="yellow100">
                  Spread the word that you’re a member!
                </H2>
                <Body2 $color="yellow100">
                  Sharing about Cabin helps us connect with more online creators
                  and grow our community
                </Body2>
              </>
            ) : (
              <>
                <H2 $color="yellow100">Profile progress</H2>
                <H2 $color="yellow100">{progress}% Complete</H2>
              </>
            )}
          </ProfileProgressData>
          {complete ? (
            <LinkContainer
              color="yellow100"
              onClick={
                hasDismissed ? handleMaybeLaterClick : handleDismissClick
              }
            >
              <Overline>{hasDismissed ? 'Maybe Later' : 'Dismiss'}</Overline>
              <Icon name="close" size={1.4} color="yellow100" />
            </LinkContainer>
          ) : (
            <LinkContainer color="yellow100" onClick={handleSetupClick}>
              <Overline>Setup profile</Overline>
              <Icon name="chevron-right" color="yellow100" size={1.4} />
            </LinkContainer>
          )}
        </ProfileCompletionData>
        {hasDismissed ? (
          <TwitterShare
            startAdornment={
              <Icon name="twitter" color="yellow100" size={1.6} />
            }
            onClick={handleTwitterShareClick}
          >
            Tweet
          </TwitterShare>
        ) : (
          <ProgressBar progress={progress} />
        )}
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

const TwitterShare = styled(Button)`
  background-color: ${({ theme }) => theme.colors.twitter};
  align-self: flex-start;
  color: white;
`
