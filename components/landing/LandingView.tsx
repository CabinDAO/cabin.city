import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Footer } from '@/components/navigation/Footer'
import { HeroVideo } from '../core/HeroVideo'
import { BookingSection } from './BookingSection'
import { DetailedInfoSection } from './DetailedInfoSection'
import { JoinSection } from './JoinSection'
import { LandingDiscordSection } from './LandingDiscordSection'
import { SubscribeSection } from './SubscribeSection'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { TextSection } from '@/components/landing/TextSection'
import { LandingSection } from '@/components/landing/LandingSection'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { RoleCard } from '@/components/core/RoleCard'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { roleInfoFromType } from '@/utils/roles'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import Link from 'next/link'

export const LandingView = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <StyledLayout variant="full">
      <TopLogoSection />

      <LandingSection>
        <HeroSection
          title={'Colive with friends in nature'}
          body={
            'Cabin is a global network of beautiful properties in nature for remote workers seeking meaningful connections'
          }
          buttons={[
            <Link key="1" href="/cabin-week">
              <Button>Try it out</Button>
            </Link>,
            <a key="2" href="mailto:home@cabin.city">
              <Button variant="secondary">Contact us</Button>
            </a>,
          ]}
        />
      </LandingSection>

      <LandingSection>
        <HeroVideo />
      </LandingSection>

      <LandingSection>
        <BookingSection />
      </LandingSection>

      <LandingSection variant="dark" title={'Who is Cabin for?'}>
        <TextSection variant="dark">
          Cabin is for individuals seeking to grow their skills and forge
          stronger connections with like-minded peers in inspiring locations
        </TextSection>
        <SlideshowContainer>
          <Slideshow key={deviceSize}>
            {Object.values(ProfileRoleType).map((role) => (
              <RoleCard
                key={`${role}-${deviceSize}`}
                variant={deviceSize === 'desktop' ? 'default' : 'small'}
                roleInfo={roleInfoFromType(ProfileRoleType[role])}
                levelInfo={levelInfoFromType(ProfileRoleLevelType.Custodian)}
              />
            ))}
          </Slideshow>
        </SlideshowContainer>
      </LandingSection>

      <LandingSection>
        <DetailedInfoSection />
      </LandingSection>

      <LandingSection
        id="join"
        variant="dark"
        noTopPadding
        noBottomPadding
        fullWidth
      >
        <JoinSection />
      </LandingSection>

      <LandingSection>
        <TestimonialSection />
      </LandingSection>

      <LandingSection>
        <LandingDiscordSection />
      </LandingSection>

      <SubscribeLandingSection>
        <SubscribeSection />
      </SubscribeLandingSection>

      <LandingSection variant="dark">
        <Footer />
      </LandingSection>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const SubscribeLandingSection = styled(LandingSection)`
  background-color: ${({ theme }) => theme.colors.yellow100};
`

const SlideshowContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    box-sizing: content-box;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
    width: 80rem;
  }
`
