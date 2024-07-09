import { BaseLayout } from '@/components/core/BaseLayout'
import { LandingSection } from '@/components/landing/LandingSection'
import headerBg from '@/components/landing/accelerator-header.jpg'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { HeroSection } from '@/components/landing/HeroSection'
import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import React from 'react'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { TwitterSection } from '@/components/landing/TwitterSection'

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
          backgroundPosition: '50% 40%',
        }}
      >
        <OpaqueDiv>
          <TopLogoSection />
          <HeroSection
            headerText={'Upgrade your neighborhood'}
            subheaderText={`Cabin's Neighborhood Accelerator supports people in building vibrant communities in their local neighborhoods`}
            buttons={[
              <Link
                key="1"
                href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
              >
                <Button>Join the fall cohort</Button>
              </Link>,
              <Link
                key="2"
                href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=acceleratorpageheader`}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <Button variant={'secondary'}>Book a call to discuss</Button>
              </Link>,
            ]}
          />
        </OpaqueDiv>
      </LandingSection>

      <LandingSection>
        <ValuesSection />
      </LandingSection>

      <LandingSection title={'What people are saying'} variant={'light'}>
        <TestimonialSection />
        <TwitterSection />
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
  background-color: rgba(0, 0, 0, 0.6);
`
