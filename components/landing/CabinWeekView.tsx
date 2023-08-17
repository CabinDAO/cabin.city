import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { LandingContentNoPadding } from './styles'
import { SubscribeSection } from './SubscribeSection'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { HeroSection } from '@/components/landing/HeroSection'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { HeroImage } from '@/components/core/HeroImage'

export const CabinWeekView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection
          title={'Discover community togetherness'}
          body={
            'Join one of our upcoming short-term coliving experiences featuring group dinners, local trips, intentional co-creation, and free time activities.'
          }
          buttons={[
            <a key="1" href={EXTERNAL_LINKS.BOOKING_TYPEFORM}>
              <Button>Join a Cabin Week</Button>
            </a>,
          ]}
        />
      </LandingSection>

      <LandingSection>
        <HeroImage
          src={'/images/cabin-week-hero.jpg'}
          alt={'Cabin week'}
          caption={'Montaia Basecamp in Swall Meadows, CA'}
        />
      </LandingSection>

      <SubscribeLandingSection>
        <SubscribeSection />
      </SubscribeLandingSection>

      <LandingSection variant="dark">
        <LandingContent>
          <Footer />
        </LandingContent>
      </LandingSection>
    </StyledLayout>
  )
}

const LandingContent = styled(LandingContentNoPadding)`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 8rem 2.4rem;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    box-sizing: content-box;
    padding: 8rem 2.4rem 8rem 12.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
    padding: 8rem 4rem;
  }
`

interface LandingSectionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
}

const LandingSection = styled.div<LandingSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, variant }) =>
    variant === 'dark' ? theme.colors.green800 : theme.colors.yellow200};
  width: 100%;
  overflow: hidden;

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 2.4rem;
  }
`

type LandingSectionVariant = 'dark' | 'light'

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const SubscribeLandingSection = styled(LandingSection)`
  background-color: ${({ theme }) => theme.colors.yellow100};
`
