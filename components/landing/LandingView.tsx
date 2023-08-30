import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { HeroVideo } from '../core/HeroVideo'
import { BookingSection } from './BookingSection'
import { DetailedInfoSection } from './DetailedInfoSection'
import { JoinSection } from './JoinSection'
import { LandingDiscordSection } from './LandingDiscordSection'
import { SubscribeSection } from './SubscribeSection'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { QuotesSection } from '@/components/landing/QuotesSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { LandingSection } from '@/components/landing/LandingSection'
import Link from 'next/link'
import { TextSection } from '@/components/landing/TextSection'

export const LandingView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection
          title={'Colive with friends in nature'}
          body={
            'Cabin is a global network of beautiful properties in nature for remote workers seeking meaningful connections'
          }
          buttons={[
            <Link key="1" href="/cabin-week">
              <Button>Try it out</Button>
            </Link>,
            <a key="2" href="mailto:home@cabin.city">
              <Button variant="secondary">Contact us</Button>
            </a>,
          ]}
        />
      </LandingSection>

      <LandingSection>
        <HeroVideo />
      </LandingSection>

      <LandingSection>
        <BookingSection />
      </LandingSection>

      <LandingSection>
        <DetailedInfoSection />
      </LandingSection>

      <LandingSection
        id="join"
        variant="dark"
        noTopPadding
        noBottomPadding
        fullWidth
      >
        <JoinSection />
      </LandingSection>

      <LandingSection title={'What people are saying'} variant={'light'}>
        <TestimonialSection />
      </LandingSection>

      <LandingSection>
        <LandingDiscordSection />
      </LandingSection>

      <SubscribeLandingSection>
        <SubscribeSection />
      </SubscribeLandingSection>

      <LandingSection variant="dark">
        <Footer />
      </LandingSection>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const SubscribeLandingSection = styled(LandingSection)`
  background-color: ${({ theme }) => theme.colors.yellow100};
`
