import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { MeFragment, ProfileSetupStateParams } from '@/utils/types/profile'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { Body1, H2, Overline } from '@/components/core/Typography'
import Link from 'next/link'
import mapPinPic from '@/components/map/mapPinPic.png'
import { AutoImage } from '@/components/core/AutoImage'
import { ColorName } from '@/styles/theme'
import Icon from '@/components/core/Icon'

export const ProfileNextStepsSection = ({ me }: { me: MeFragment }) => {
  const { post } = useBackend()

  const [hideLinkContainer, setHideLinkContainer] = useState(false)

  if (!me || me.isProfileSetupDismissed || hideLinkContainer) return null

  const handleDismissClick = async () => {
    setHideLinkContainer(true)
    analytics.onboardingActionEvent(me.externId, 'census_cta_dismiss')
    return post('api_profile_setupState', {
      state: 'dismissed',
    } satisfies ProfileSetupStateParams)
  }

  // const handleTwitterShareClick = () => {
  //   analytics.shareEvent('twitter', 'profile_setup', me.externId)
  //   const text = encodeURIComponent(
  //     `I'm live on the @cabindotcity Census. Check it out on cabin.city.`
  //   )
  //   window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  // }

  const handleCensusLinkCTAClick = () => {
    analytics.onboardingActionEvent(me.externId, 'census_link_cta')
  }

  const handleCensusImageCTAClick = () => {
    analytics.onboardingActionEvent(me.externId, 'census_image_cta')
  }

  const queryString =
    me.address?.lat && me.address?.lng
      ? `?center=${me.address?.lat},${me.address?.lng}`
      : ''

  return (
    <StyledContentCard fillType="hard" notchSize={1.6} shape="notch">
      <InnerContainer>
        <LinkContainer color="yellow100" onClick={handleDismissClick}>
          {/*<Overline>Dismiss</Overline>*/}
          <Icon name="close" size={1.4} color="yellow100" />
        </LinkContainer>

        <H2 $color="yellow100">🎉 Welcome to Cabin 🎉</H2>
        <Content>
          <Instructions>
            <Body1 $color="yellow100">
              Next, head over to the{' '}
              <Link
                href={`/census${queryString}`}
                style={{ textDecoration: 'underline' }}
                onClick={handleCensusLinkCTAClick}
              >
                Cabin Census
              </Link>{' '}
              and <strong>say hi to your nearest Cabin member</strong>.
            </Body1>
            <Body1 $color="yellow100">
              You can zoom in and out, then click on a pin to go to someone's
              profile.
            </Body1>
          </Instructions>
          <Pic>
            <Link
              href={`/census${queryString}`}
              style={{ textDecoration: 'underline' }}
              onClick={handleCensusImageCTAClick}
            >
              <AutoImage src={mapPinPic.src} alt={'map pin'} />
            </Link>
          </Pic>
        </Content>
      </InnerContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  max-width: 40rem;
  margin: 0 auto;

  ${({ theme }) => theme.bp.md} {
    max-width: 65rem;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2.4rem;
  gap: 2.4rem;
  background-color: ${({ theme }) => theme.colors.green800};
  width: 100%;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    align-items: flex-start;
    gap: 3.5rem;
  }
`
const Pic = styled.div`
  width: 50%;
  max-width: 15rem;
  border-radius: 4rem;
  overflow: hidden;
  box-shadow: 6px 6px 0px 0px #000;

  ${({ theme }) => theme.bp.md} {
    max-width: 10rem;
  }
`

const Instructions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 40rem;
`

const LinkContainer = styled.div<{ color: ColorName }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
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
