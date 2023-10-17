import styled from 'styled-components'
import Link from 'next/link'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { HeroVideo } from '../core/HeroVideo'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
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
import { SupperClubSection } from '@/components/landing/SupperClubSection'
import { Body1 } from '@/components/core/Typography'

export const LandingView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection
          title={'Internet friends building a network of modern villages'}
          body={
            'Cabin is pioneering a new way of living rooted in meaningful connection between people and place.'
          }
          buttons={[]}
        />
      </LandingSection>

      <LandingSection fullWidth noVertPadding>
        <HeroVideo />
      </LandingSection>

      <LandingSection precedesNoVertPadding>
        <ValuesSection />
      </LandingSection>

      {/*<LandingSection fullWidth noVertPadding variant={'light'}>*/}
      {/*  <SupperClubSection />*/}
      {/*</LandingSection>*/}

      {/*<LandingSection*/}
      {/*  title={'Participate in Cabin'}*/}
      {/*  icon={'map-green'}*/}
      {/*  precedesNoVertPadding*/}
      {/*>*/}
      {/*  <Body>*/}
      {/*    Join the community online, break bread at supper club, or visit one of*/}
      {/*    the beautiful properties in the directory to be apart of the journey.{' '}*/}
      {/*  </Body>*/}
      {/*  <HorizontalList*/}
      {/*    centered*/}
      {/*    items={[*/}
      {/*      {*/}
      {/*        title: 'Easy',*/}
      {/*        body: 'Check out our newsletter, blog, and podcast content and join our discord community.',*/}
      {/*        icon: 'mountains',*/}
      {/*        button: (*/}
      {/*          <Link*/}
      {/*            href={EXTERNAL_LINKS.CABIN_DISCORD}*/}
      {/*            style={{ padding: '0' }}*/}
      {/*          >*/}
      {/*            <ActionButton variant={'tertiary'}>Join Discord</ActionButton>*/}
      {/*          </Link>*/}
      {/*        ),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        title: 'Medium',*/}
      {/*        body: 'Foster meaningful connections and discussions by hosting a Supper Club in your area.',*/}
      {/*        icon: 'lightning-bolt',*/}
      {/*        button: (*/}
      {/*          <Link*/}
      {/*            href={EXTERNAL_LINKS.CABIN_DISCORD}*/}
      {/*            style={{ padding: '0' }}*/}
      {/*          >*/}
      {/*            <ActionButton variant={'tertiary'}>*/}
      {/*              Become a Host*/}
      {/*            </ActionButton>*/}
      {/*          </Link>*/}
      {/*        ),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        title: 'Hard',*/}
      {/*        body: 'Become a Citizen to expand Cabin and unlock access to properties in the directory.',*/}
      {/*        icon: 'peace-sign',*/}
      {/*        button: (*/}
      {/*          <Link*/}
      {/*            href={EXTERNAL_LINKS.CABIN_DISCORD}*/}
      {/*            style={{ padding: '0' }}*/}
      {/*          >*/}
      {/*            <ActionButton variant={'tertiary'}>Learn More</ActionButton>*/}
      {/*          </Link>*/}
      {/*        ),*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*  <Spacer />*/}
      {/*</LandingSection>*/}

      <LandingSection fullWidth noVertPadding>
        <NeighborhoodShowcase />
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

      <LandingSection variant="dark">
        <Footer />
      </LandingSection>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const Body = styled(Body1)`
  text-align: center;

  ${({ theme }) => theme.bp.lg} {
    max-width: 42rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 56rem;
  }
`

const ActionButton = styled(Button)`
  margin-top: 2rem;
`

const Spacer = styled.div`
  height: 8rem;
`
