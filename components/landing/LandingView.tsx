import styled from 'styled-components'
import Link from 'next/link'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { HeroVideo } from '../core/HeroVideo'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { SubscribeSection } from './SubscribeSection'
import { TestimonialSection } from './TestimonialSection'
import { HeroSection } from './HeroSection'
import { TopLogoSection } from './TopLogoSection'
import { LandingSection } from './LandingSection'
import { TwitterSection } from './TwitterSection'
import { FeaturedInSection } from './FeaturedInSection'
import { LearnMoreSection } from './LearnMoreSection'
import { NeighborhoodShowcase } from '@/components/landing/NeighborhoodShowcase'
import { HorizontalList } from '@/components/landing/HorizontalList'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { IntroExperienceSection } from '@/components/landing/IntroExperienceSection'

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

      <LandingSection fullWidth noVertPadding>
        <HeroVideo />
      </LandingSection>

      <LandingSection precedesNoVertPadding>
        <ValuesSection />
      </LandingSection>

      <LandingSection fullWidth noVertPadding variant={'light'}>
        <IntroExperienceSection />
      </LandingSection>

      <LandingSection title={'Colive at Cabin'} icon={'map-green'}>
        <HorizontalList
          centered
          items={[
            {
              title: 'Access to nature',
              body: 'Breathtaking scenery available outside the front door.',
              icon: 'mountains',
            },
            {
              title: 'Fast internet',
              body: 'Reliable, high-speed WiFi to make it easy to connect and do work.',
              icon: 'lightning-bolt',
            },
            {
              title: 'Strong community',
              body: 'Good vibes for thoughtful people to live together smoothly.',
              icon: 'peace-sign',
            },
          ]}
        />
      </LandingSection>

      <LandingSection>
        <Link href={EXTERNAL_LINKS.COLIVING_TYPEFORM}>
          <Button>Apply to colive</Button>
        </Link>
      </LandingSection>

      <LandingSection fullWidth>
        <NeighborhoodShowcase />
      </LandingSection>

      <LandingSection title={'Ways to stay at Cabin'} icon={'backpack-green'}>
        <HorizontalList
          centered
          items={[
            {
              title: 'Attend a Cabin Week',
              body: 'These 1-2 week long events are our official welcome to the Cabin community and a taste of coliving.',
              icon: 'calendar-star-four-points',
            },
            {
              title: 'Apply to Colive',
              body: 'Browse our directory of coliving offers across the network city and apply for your next experience.',
              icon: 'account-box',
            },
            {
              title: 'Become a Citizen',
              body: 'Access our full network of coliving options by receiving a vouch from a current citizen and purchasing a membership.',
              icon: 'check-decagram',
            },
          ]}
        />
        <Link href="/cabin-week">
          <Button>Try it out</Button>
        </Link>
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

      <LandingSection variant={'light'}>
        <SubscribeSection />
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
