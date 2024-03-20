import { ContentCard } from '../../core/ContentCard'
import styled from 'styled-components'
import { Body2, H2, Overline } from '../../core/Typography'
import { ProgressBar } from '../../core/ProgressBar'
import { ColorName } from '@/styles/theme'
import Icon from '../../core/Icon'
import { useRouter } from 'next/router'
import { Button } from '@/components/core/Button'
import events from '@/lib/googleAnalytics/events'
import { MeFragment, ProfileSetupStateParams } from '@/utils/types/profile'
import { useBackend } from '@/components/hooks/useBackend'
import { useState } from 'react'

interface ProfileSetupSectionProps {
  profileId: string
  me: MeFragment
}

export const ProfileSetupSection = ({
  profileId,
  me,
}: ProfileSetupSectionProps) => {
  const complete = me.isProfileSetupFinished
  const router = useRouter()
  const { post } = useBackend()
  const progress = complete ? 100 : 25

  const [hideLinkContainer, setHideLinkContainer] = useState(false)

  if (!me || me.isProfileSetupDismissed || hideLinkContainer) return null

  const handleSetupClick = () => {
    router.push(`/profile/${profileId}/setup`)
  }

  const handleDismissClick = () => {
    setHideLinkContainer(true)
    post('PROFILE_SETUP_STATE', {
      state: 'dismissed',
    } as ProfileSetupStateParams)
  }

  const handleTwitterShareClick = () => {
    events.shareEvent('twitter', 'profile_setup', profileId)

    const text = encodeURIComponent(
      `I'm live on the @cabindotcity Census. Check it out on cabin.city.`
    )

    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  return (
    <ContentCard fillType="hard" notchSize={1.6} shape="notch">
      <InnerContainer>
        <ProfileCompletionData>
          <ProfileProgressData>
            <H2 $color="yellow100">Profile progress</H2>
            <H2 $color="yellow100">{progress}% Complete</H2>
          </ProfileProgressData>
          {complete ? (
            <LinkContainer color="yellow100" onClick={handleDismissClick}>
              <Overline>Dismiss</Overline>
              <Icon name="close" size={1.4} color="yellow100" />
            </LinkContainer>
          ) : (
            <Button onClick={handleSetupClick}>Finish setup</Button>
          )}
        </ProfileCompletionData>
        <ProgressBar progress={progress} />
        {complete ? (
          <TwitterShareSection>
            <TwitterTextContainer>
              <Body2 $color="yellow100">
                Help Cabin connect with more online creators and grow our
                community by sharing your experience.
              </Body2>
            </TwitterTextContainer>
            <TwitterShareButton
              startAdornment={
                <Icon name="twitter" color="yellow100" size={1.6} />
              }
              onClick={handleTwitterShareClick}
            >
              Tweet
            </TwitterShareButton>
          </TwitterShareSection>
        ) : null}
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

const TwitterTextContainer = styled.div`
  max-width: 100%;

  ${({ theme }) => theme.bp.md} {
    max-width: 60%;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 40%;
  }
`

const TwitterShareSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const TwitterShareButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.twitter};
  align-self: flex-start;
  color: white;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
