import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import { Body1, H1 } from '@/components/core/Typography'
import { Footer } from '@/components/navigation/Footer'
import { roleInfoFromType } from '@/utils/roles'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { RoleCard } from '@/components/core/RoleCard'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { HeroVideo } from '../core/HeroVideo'
import { AuthenticatedLink } from '../core/AuthenticatedLink'
import { useDeviceSize } from '../hooks/useDeviceSize'
import Icon from '../core/Icon'
import { BookingSection } from './BookingSection'
import { DetailedInfoSection } from './DetailedInfoSection'
import { LandingContentNoPadding, SectionContent, StyledHHero } from './styles'
import { JoinSection } from './JoinSection'
import { LandingDiscordSection } from './LandingDiscordSection'
import { SubscribeSection } from './SubscribeSection'
import { useExternalUser } from '../auth/useExternalUser'

export const LandingView = () => {
  const { externalUser } = useExternalUser()
  const { deviceSize } = useDeviceSize()

  return (
    <StyledLayout variant="full">
      <LandingSection>
        <LandingContent>
          <SectionContent>
            <HeroDescriptionContainer>
              <StyledHHero>
                Colive across a global network of properties in nature
              </StyledHHero>
              <SectionGrowDescription>
                <Body1>
                  Cabin is a network city that connects people to coliving
                  experiences and
                </Body1>
                <Body1>work/stay residencies</Body1>
              </SectionGrowDescription>
            </HeroDescriptionContainer>
            <SectionHeader>
              <SectionGrowSignup>
                <a
                  href={EXTERNAL_LINKS.VISION}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    endAdornment={<Icon name="up-right-arrow" size={0.9} />}
                    variant="secondary"
                  >
                    View our vision
                  </Button>
                </a>
                <AuthenticatedLink href="/dashboard">
                  <Button>{externalUser ? 'View Dashboard' : 'Sign In'}</Button>
                </AuthenticatedLink>
              </SectionGrowSignup>
            </SectionHeader>
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection>
        <HeroVideo />
      </LandingSection>

      <LandingSection>
        <BookingSection />
      </LandingSection>

      <LandingSection variant="dark">
        <LandingContent>
          <SectionContent>
            <SectionHeader>
              <H1 emphasized>Who is Cabin for?</H1>
              <SectionDescription>
                Cabin is for individuals seeking to grow their skills and forge
                stronger connections with like-minded peers in inspiring
                locations
              </SectionDescription>
            </SectionHeader>
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
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection>
        <DetailedInfoSection />
      </LandingSection>

      <LandingSection>
        <JoinSection />
      </LandingSection>

      <LandingSection>
        <LandingDiscordSection />
      </LandingSection>

      <SubscribeLandingSection>
        <SubscribeSection />
      </SubscribeLandingSection>

      <LandingSection variant="dark">
        <LandingContent>
          <Footer />
        </LandingContent>
      </LandingSection>
    </StyledLayout>
  )
}

const LandingContent = styled(LandingContentNoPadding)`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 8rem 2.4rem;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    box-sizing: content-box;
    padding: 8rem 2.4rem 8rem 12.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
    padding: 8rem 4rem;
  }
`

const SectionGrowDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const SectionGrowSignup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }

  ${({ theme }) => theme.bp.md_max} {
    > * {
      flex-grow: 1;
    }

    button {
      width: 100%;
    }
  }
`

const SectionHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }
`

const SectionDescription = styled(Body1)`
  width: 100%;
  opacity: 0.75;

  ${({ theme }) => theme.bp.md} {
    width: 56rem;
  }
`

interface LandingSectionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
}

const LandingSection = styled.div<LandingSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, variant }) =>
    variant === 'dark' ? theme.colors.green800 : theme.colors.yellow200};
  width: 100%;
  overflow: hidden;

  ${H1} {
    color: ${({ theme, variant }) =>
      variant === 'dark' ? theme.colors.yellow100 : theme.colors.green900};
  }

  ${SectionDescription} {
    color: ${({ theme, variant }) =>
      variant === 'dark' ? theme.colors.yellow100 : theme.colors.green900};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 2.4rem;
  }
`

export const HeroDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`

type LandingSectionVariant = 'dark' | 'light'

const StyledLayout = styled(SingleColumnLayout)`
  margin-bottom: 0rem;
`

const SubscribeLandingSection = styled(LandingSection)`
  background-color: ${({ theme }) => theme.colors.yellow100};
`
