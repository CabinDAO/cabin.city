import styled from 'styled-components'
import headerBg from './header.jpg'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { TestimonialSection } from './TestimonialSection'
import { HeroSection } from './HeroSection'
import { TopLogoSection } from './TopLogoSection'
import { LandingSection } from './LandingSection'
import { TwitterSection } from './TwitterSection'
import { FeaturedInSection } from './FeaturedInSection'
import { LearnMoreSection } from './LearnMoreSection'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { SupperClubSection } from '@/components/landing/SupperClubSection'
import { JourneySection } from '@/components/landing/JourneySection'
import { MapSection } from '@/components/landing/MapSection'
import { SubscribeSection } from '@/components/landing/SubscribeSection'

export const LandingView = () => {
  return (
    <StyledLayout variant="full">
      <LandingSection
        fullWidth
        noVertPadding
        variant={'clear'}
        style={{
          backgroundImage: `url(${headerBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <OpaqueDiv>
          <TopLogoSection />
          <HeroSection />
        </OpaqueDiv>
      </LandingSection>

      {/*<LandingSection fullWidth noVertPadding>*/}
      {/*  <HeroVideo />*/}
      {/*</LandingSection>*/}

      <LandingSection fullWidth noVertPadding>
        <MapSection />
      </LandingSection>

      <LandingSection>
        <JourneySection />
      </LandingSection>

      <LandingSection precedesNoVertPadding>
        <SubscribeSection />
      </LandingSection>

      <LandingSection fullWidth noVertPadding variant={'light'}>
        <SupperClubSection />
      </LandingSection>

      <LandingSection>
        <ValuesSection />
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
        // icon={'hand-wave-green'}
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

const OpaqueDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`
