import React from 'react'
import styled, { css } from 'styled-components'
import { padding } from '@/styles/theme'
import headerBg from '@/components/accelerator/accelerator-header.jpg'
import { BaseContainer } from '@/components/core/BaseContainer'
import { Body1 } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { LandingSection } from '@/components/landing/LandingSection'
import { Top } from '@/components/accelerator/Top'
import { SectionTitle } from '@/components/accelerator/shared'
import { AboutSection } from '@/components/accelerator/AboutSection'
import { DetailsSection } from '@/components/accelerator/DetailsSection'
import { FaqSection } from '@/components/accelerator/FaqSection'
import { SubscribeForm } from '@/components/landing/SubscribeForm'
import { IsItRightSection } from '@/components/accelerator/IsItRightSection'
import { PriceSection } from '@/components/accelerator/PriceSection'
import { VisionSection } from '@/components/accelerator/VisionSection'
import { NeighborhoodStoriesSection } from '@/components/accelerator/NeighborhoodStoriesSection'
import { ImagineSection } from '@/components/accelerator/ImagineSection'
import { TeamSection } from '@/components/accelerator/TeamSection'
import { CTAModal } from '@/components/landing/CTAModal'

export const subscribeSectionID = 'updates'

export const AcceleratorPageView = () => {
  return (
    <BaseLayout landingPage>
      <CTAModal />
      <LandingSection
        noVertPadding
        variant={'clear'}
        style={{
          backgroundImage: `url(${headerBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 70%',
        }}
      >
        <Top />
      </LandingSection>

      <Section variant={'dark'}>
        <ImagineSection />
      </Section>

      <Section variant={'default'}>
        <AboutSection />
      </Section>

      <Section variant={'dark'}>
        <IsItRightSection />
      </Section>

      <Section variant={'default'}>
        <NeighborhoodStoriesSection variant={'nap'} />
      </Section>

      <Section variant={'orange'}>
        <DetailsSection />
      </Section>

      <Section variant={'default'}>
        <PriceSection />
      </Section>

      <Section variant={'orange'}>
        <FaqSection />
      </Section>

      {/* <Section variant={'light'}>
        <TeamSection />
      </Section> */}

      <Section variant={'default'}>
        <VisionSection />
      </Section>

      <LandingSection variant={'default'} id={subscribeSectionID} noVertPadding>
        <SubscribeContainer maxWidth={60}>
          <SectionTitle>Can't join us for this round?</SectionTitle>
          <Body1>
            No worries. Be the first to know about future rounds of the program.
          </Body1>
          <SubscribeForm />
        </SubscribeContainer>
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

const Section = styled(LandingSection)`
  ${padding.top('xl')};
  ${padding.bottom('xl')};

  ${({ variant }) =>
    variant === 'dark' &&
    css`
      background-color: ${({ theme }) => theme.colors.green900};
    `}
`

const SubscribeContainer = styled(BaseContainer)`
  align-items: center;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    margin-top: 4rem;
    margin-bottom: 10rem;
  }
`
