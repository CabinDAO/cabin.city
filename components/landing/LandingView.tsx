import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useModal } from '@/components/hooks/useModal'
import { useLocalStorage, useWindowScroll } from 'react-use'
import { useUser } from '@/components/auth/useUser'
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
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { Body1, H2 } from '@/components/core/Typography'
import { SubscribeForm } from '@/components/landing/SubscribeForm'

export const LandingView = ({ mapData }: { mapData: MapData }) => {
  const { user } = useUser()
  const { showModal } = useModal()
  const { y } = useWindowScroll()
  const [popupLastShownAt, setPopupLastShownAt] = useLocalStorage<number>(
    'landingPopupLastShownAt'
  )

  useEffect(() => {
    if (
      !user &&
      y > 4500 &&
      (!popupLastShownAt || Date.now() - popupLastShownAt > 1000 * 60 * 60 * 24)
    ) {
      setPopupLastShownAt(Date.now())
      showModal(() => <CTAModal />)
    }
  }, [y, user, popupLastShownAt])

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
            subheaderText={`${mapData.members} neighbors | ${mapData.locations.length} neighborhoods`}
            buttons={[
              <Link key="1" href="/city-directory">
                <Button>Find one near you</Button>
              </Link>,
              <Link key="2" href="/accelerator">
                <Button variant={'secondary'}>Start a neighborhood</Button>
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

const CTAModal = () => {
  return (
    <StyledModalContainer>
      <ModalTitle text={'Get Our Updates'} />
      <ModalContent>
        <Body1>We'll help you turn your neighborhood into a community.</Body1>
        <SubscribeForm />
      </ModalContent>
    </StyledModalContainer>
  )
}

const StyledModalContainer = styled(ModalContainer)`
  height: min-content;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 3.2rem;
  gap: 3.2rem;
  text-align: center;
`
