import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { HeroVideo } from '../core/HeroVideo'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { TestimonialSection } from './TestimonialSection'
import { HeroSection } from './HeroSection'
import { TopLogoSection } from './TopLogoSection'
import { LandingSection } from './LandingSection'
import { TwitterSection } from './TwitterSection'
import { FeaturedInSection } from './FeaturedInSection'
import { LearnMoreSection } from './LearnMoreSection'
import { NeighborhoodShowcase } from '@/components/landing/NeighborhoodShowcase'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { SupperClubSection } from '@/components/landing/SupperClubSection'
import { Body1 } from '@/components/core/Typography'
import { JourneySection } from '@/components/landing/Journeysection'

export const LandingView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection buttons={[]} />
      </LandingSection>

      <LandingSection fullWidth noVertPadding>
        <HeroVideo />
      </LandingSection>

      <LandingSection precedesNoVertPadding>
        <JourneySection />
      </LandingSection>

      <LandingSection fullWidth noVertPadding variant={'light'}>
        <SupperClubSection />
      </LandingSection>

      <LandingSection>
        <ValuesSection />
      </LandingSection>

      <LandingSection fullWidth variant={'dark'}>
        <NeighborhoodShowcase />
      </LandingSection>

      <LandingSection title={'What people are saying'} variant={'light'}>
        <TestimonialSection />
        <TwitterSection />
      </LandingSection>

      <LandingSection variant={'light'}>
        <FeaturedInSection />
      </LandingSection>

      <LandingSection
        title={'Want to learn more?'}
        icon={'hand-wave-green'}
        precedesNoVertPadding
      >
        <LearnMoreSection />
      </LandingSection>

      <LandingSection fullWidth noVertPadding>
        <ImageFlex
          alt="forest-network"
          src="/images/landing-forest-network.svg"
          height={32}
          width={84}
        />
      </LandingSection>

      <LandingSection variant="dark">
        <Footer />
      </LandingSection>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const Body = styled(Body1)`
  text-align: center;

  ${({ theme }) => theme.bp.lg} {
    max-width: 42rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 56rem;
  }
`

const ActionButton = styled(Button)`
  margin-top: 2rem;
`

const Spacer = styled.div`
  height: 8rem;
`
