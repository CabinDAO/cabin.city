import styled from 'styled-components'
import headerBg from './header.jpg'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { HeroSection } from './HeroSection'
import { TopLogoSection } from './TopLogoSection'
import { LandingSection } from './LandingSection'
import { TwitterSection } from './TwitterSection'
import { FeaturedInSection } from './FeaturedInSection'
import { LearnMoreSection } from './LearnMoreSection'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { SupperClubSection } from '@/components/landing/SupperClubSection'
import { JourneySection } from '@/components/landing/JourneySection'
import { MapData, MapSection } from '@/components/landing/MapSection'
import { SubscribeSection } from '@/components/landing/SubscribeSection'
import Link from 'next/link'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import React from 'react'
import { NeighborhoodStoriesSection } from '@/components/accelerator/NeighborhoodStoriesSection'

export const LandingView = ({ mapData }: { mapData: MapData }) => {
  return (
    <BaseLayout landingPage>
      <LandingSection
        noVertPadding
        variant={'clear'}
        style={{
          backgroundImage: `url(${headerBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 27%',
        }}
      >
        <OpaqueDiv>
          <TopLogoSection />
          <HeroSection
            headerText={
              'A network of neighborhoods where you’d want to grow up'
            }
            subheaderText={`${mapData.members} community members | ${mapData.locations.length} neighborhoods`}
            buttons={[
              <Link key="1" href="/city-directory">
                <Button>Find one near you</Button>
              </Link>,
              <Link
                key="2"
                href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=landingpageheader`}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <Button variant={'secondary'}>Book a welcome call</Button>
              </Link>,
            ]}
          />
        </OpaqueDiv>
      </LandingSection>

      {/*<LandingSection fullWidth noVertPadding>*/}
      {/*  <HeroVideo />*/}
      {/*</LandingSection>*/}

      <LandingSection precedesNoVertPadding>
        <SubscribeSection />
      </LandingSection>

      <LandingSection noVertPadding>
        <MapSection data={mapData} />
      </LandingSection>

      <LandingSection>
        <NeighborhoodStoriesSection variant={'landing'} />
      </LandingSection>

      <LandingSection>
        <JourneySection />
      </LandingSection>

      <LandingSection noVertPadding variant={'light'}>
        <SupperClubSection />
      </LandingSection>

      <LandingSection>
        <ValuesSection />
      </LandingSection>

      <LandingSection variant={'light'}>
        <TwitterSection />
      </LandingSection>

      <LandingSection variant={'light'}>
        <FeaturedInSection />
      </LandingSection>

      <LandingSection precedesNoVertPadding>
        <LearnMoreSection />
      </LandingSection>

      <LandingSection noVertPadding>
        <ImageFlex
          alt="forest-network"
          src="/images/landing-forest-network.svg"
          height={32}
          width={84}
        />
      </LandingSection>
    </BaseLayout>
  )
}

const OpaqueDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
