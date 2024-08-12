import React from 'react'
import { padding } from '@/styles/theme'
import headerBg from '@/components/accelerator/accelerator-header.jpg'
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
import styled, { css } from 'styled-components'

export const subscribeSectionID = 'updates'

export const AcceleratorPageView = () => {
  return (
    <BaseLayout variant="landing">
      <LandingSection
        fullWidth
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
        <NeighborhoodStoriesSection variant={'accelerator'} />
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

      <Section variant={'default'}>
        <VisionSection />
      </Section>

      <LandingSection variant={'default'} id={subscribeSectionID} noVertPadding>
        <SubscribeContainer>
          <SectionTitle>Can't join us for this round?</SectionTitle>
          <Body1>
            No worries. Be the first to know about future rounds of the program.
          </Body1>
          <SubscribeForm />
        </SubscribeContainer>
      </LandingSection>

      <LandingSection fullWidth noVertPadding>
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

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2.4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: calc(100vw - 30rem);
    max-width: 130rem;
    margin-top: 4rem;
    margin-bottom: 10rem;
  }
`
