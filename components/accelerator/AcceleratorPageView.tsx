import React from 'react'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import headerBg from '@/components/accelerator/accelerator-header.jpg'
import { Body1, fonts, H2, H3 } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { LandingSection } from '@/components/landing/LandingSection'
import { Carousel } from '@/components/accelerator/Carousel'
import { Top } from '@/components/accelerator/Top'
import { AboutSection } from '@/components/accelerator/AboutSection'
import { DetailsSection } from '@/components/accelerator/DetailsSection'
import { FaqSection } from '@/components/accelerator/FaqSection'
import { SubscribeForm } from '@/components/landing/SubscribeForm'
import { IsItRightSection } from '@/components/accelerator/IsItRightSection'
import { PriceSection } from '@/components/accelerator/PriceSection'

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

      <LandingSection variant={'dark'}>
        <Carousel />
      </LandingSection>

      <LandingSection variant={'default'}>
        <AboutSection />
      </LandingSection>

      <LandingSection variant={'dark'}>
        <IsItRightSection />
      </LandingSection>

      <LandingSection variant={'default'}>
        <AcceleratorSectionTitle>Neighborhood stories</AcceleratorSectionTitle>
      </LandingSection>

      <LandingSection variant={'orange'}>
        <DetailsSection />
      </LandingSection>

      <LandingSection variant={'default'}>
        <PriceSection />
      </LandingSection>

      <LandingSection variant={'orange'}>
        <FaqSection />
      </LandingSection>

      <LandingSection variant={'default'}>
        <AcceleratorSectionTitle>
          We’re creating a network of modern villages
        </AcceleratorSectionTitle>
      </LandingSection>

      <LandingSection variant={'dark'} id={subscribeSectionID}>
        <AcceleratorSectionTitle light>
          Can't join us for this round?
        </AcceleratorSectionTitle>
        <Body1 style={{ color: theme.colors.yellow100 }}>
          No worries. Be the first to know about future rounds of the program.
        </Body1>
        <SubscribeForm />{' '}
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

export const AcceleratorSectionTitle = styled(H2)<{ light?: boolean }>`
  font-family: ${fonts.inter};
  font-size: 4.4rem;
  text-align: center;
  ${({ light }) =>
    light &&
    css`
      color: ${theme.colors.yellow100};
    `}

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`
