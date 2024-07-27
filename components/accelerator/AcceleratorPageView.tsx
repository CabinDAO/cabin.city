import React from 'react'
import theme from '@/styles/theme'
import headerBg from '@/components/accelerator/accelerator-header.jpg'
import { Body1 } from '@/components/core/Typography'
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
import { VisionSection } from '@/components/accelerator/VisionSection'
import { SectionTitle } from '@/components/accelerator/SectionTitle'

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
        <SectionTitle>Neighborhood stories</SectionTitle>
      </LandingSection>

      <LandingSection variant={'orange'}>
        <DetailsSection />
      </LandingSection>

      <LandingSection variant={'default'} precedesNoVertPadding>
        <PriceSection />
      </LandingSection>

      <LandingSection variant={'orange'} fullWidth noVertPadding>
        <FaqSection />
      </LandingSection>

      <LandingSection variant={'default'}>
        <VisionSection />
      </LandingSection>

      <LandingSection variant={'dark'} id={subscribeSectionID}>
        <SectionTitle light>Can't join us for this round?</SectionTitle>
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
