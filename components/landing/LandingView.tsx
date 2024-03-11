import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
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
import { JourneySection } from '@/components/landing/JourneySection'

export const LandingView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection />
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
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`
