import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { SubscribeSection } from './SubscribeSection'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { HeroImage } from '@/components/core/HeroImage'
import { NeighborhoodShowcase } from '@/components/landing/NeighborhoodShowcase'
import { TextContent, TextSection } from '@/components/landing/TextSection'
import { LandingSection } from '@/components/landing/LandingSection'
import { WordCloud } from '@/components/landing/WordCloud'
import Icon from '@/components/core/Icon'
import Link from 'next/link'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { LearnMoreSection } from '@/components/landing/LearnMoreSection'

const cabinWeekButton = (
  <Link href={EXTERNAL_LINKS.CABIN_WEEK_BOOKING_TYPEFORM}>
    <Button>Join a Cabin Week</Button>
  </Link>
)

export const CabinWeekView = () => {
  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection title={'Discover community togetherness'}>
        <TextSection>
          Join one of our upcoming short-term coliving experiences featuring
          group dinners, local trips, intentional co-creation, and free time
          activities.
        </TextSection>
        {cabinWeekButton}
      </LandingSection>

      <LandingSection fullWidth>
        <HeroImage
          src={'/images/cabin-week-hero.jpg'}
          alt={'Cabin week'}
          caption={'Montaia Basecamp in Swall Meadows, CA'}
        />
      </LandingSection>

      <LandingSection title={"What's Cabin Week?"}>
        <TextSection>
          Connect with fellow digital nomads and remote workers who share a love
          for nature and communal dining. Experience the magic of Cabin Weeks,
          where up to 12 individuals colive and collaborate for 1-2 weeks in
          breathtaking locations.
        </TextSection>
      </LandingSection>

      {/*<LandingSection*/}
      {/*  title={'What people are saying'}*/}
      {/*  icon={'account-group-green'}*/}
      {/*>*/}
      {/*  <TextSection>Video slideshow goes here</TextSection>*/}
      {/*</LandingSection>*/}

      <LandingSection
        title={"What's on the schedule?"}
        variant={'dark'}
        icon={'schedule-green'}
      >
        <TextSection variant={'dark'}>
          Each Cabin Week centers around a theme with local adventures, nightly
          group dinners, and optional curated sessions and volunteer activities.
          Cabin Weeks are designed for remote workers so while you certainly can
          take time off, you won&apos;t need to.
        </TextSection>
        <WordCloud />
      </LandingSection>

      <LandingSection title={"What's included"} icon={'check-circle-green'}>
        <CheckList>
          <ul>
            {[
              'Housing',
              'Food',
              'Programming',
              'To/from airport shuttle',
              'Access to nature',
            ].map((item, i) => {
              return (
                <li key={i}>
                  <Icon name={'check'} size={1.4} />
                  {item}
                </li>
              )
            })}
          </ul>
        </CheckList>
        <TextSection>
          After participating in a Cabin Week, you are granted Citizenship and
          get full access to coliving in the network, our flagship annual
          events, and the full suite of Citizen perks and benefits.
        </TextSection>
        {cabinWeekButton}
      </LandingSection>

      <LandingSection fullWidth title={'Cabin Week Locations'}>
        <NeighborhoodShowcase />
        {cabinWeekButton}
      </LandingSection>

      <LandingSection title={'Want to learn more?'} icon={'hand-wave-green'}>
        <LearnMoreSection />
      </LandingSection>

      <LandingSection fullWidth noBottomPadding>
        <ImageFlex
          alt="forest-network"
          src="/images/landing-forest-network.svg"
          height={32}
          width={84}
        />
      </LandingSection>

      <SubscribeLandingSection variant={'light'}>
        <SubscribeSection />
      </SubscribeLandingSection>

      <LandingSection variant="dark">
        <Footer />
      </LandingSection>
    </StyledLayout>
  )
}

const CheckList = styled(TextContent)`
  font-weight: 700;
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 1.3rem;
  }
  span {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: baseline;
  }
`

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const SubscribeLandingSection = styled(LandingSection)`
  background-color: ${({ theme }) => theme.colors.yellow100};
`
