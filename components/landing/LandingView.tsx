import Link from 'next/link'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import headerBg from './header.jpg'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Button } from '@/components/core/Button'
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
import { NeighborhoodStoriesSection } from '@/components/accelerator/NeighborhoodStoriesSection'
import { CTAModal } from '@/components/landing/CTAModal'

export const LandingView = ({ mapData }: { mapData: MapData }) => {
  return (
    <BaseLayout landingPage>
      <CTAModal />
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
            headerText={'Covering the World in Community'}
            subheader={
              <>
                <NoWrap>{mapData.members} community members</NoWrap> |{' '}
                <NoWrap>{mapData.locations.length} neighborhoods</NoWrap>
              </>
            }
            buttons={[
              <Link key="1" href={`${expandRoute('census')}?nearby=1`}>
                <Button>See who's nearby</Button>
              </Link>,
              <Link key="2" href={expandRoute('nap')}>
                <Button variant={'secondary'}>
                  Jumpstart your neighborhood
                </Button>
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

const NoWrap = styled.span`
  white-space: nowrap;
`
