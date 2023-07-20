import styled from 'styled-components'
import { Body1, Body2, H1, fonts } from '../core/Typography'
import Image from 'next/image'
import { Button } from '../core/Button'
import { AppLink } from '../core/AppLink'
import { AuthenticatedLink } from '../core/AuthenticatedLink'
import { useModal } from '../hooks/useModal'
import { CitizenshipModal } from './CitizenshipModal'
import { useDeviceSize } from '../hooks/useDeviceSize'
import events from '@/lib/googleAnalytics/events'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const JoinSection = () => {
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  const handleLearnMoreClick = () => {
    showModal(() => <CitizenshipModal />)
    events.foundCitizenLearnMoreEvent()
  }

  const isDesktop = deviceSize === 'desktop'
  const isTablet = deviceSize === 'tablet'

  return (
    <ParentContainer>
      <Background></Background>
      <Content>
        <JoinOptionContainer>
          <JoinHeader withBottomMargin={isDesktop}>
            <JoinHeaderContainer>
              <Image
                src="/images/landing-citizen.svg"
                alt="member"
                width={43}
                height={43}
              />
              <JoinOptionTitleContainer>
                <JoinOptionTitle>Try Coliving</JoinOptionTitle>
              </JoinOptionTitleContainer>
            </JoinHeaderContainer>
          </JoinHeader>
          <JoinBody $color="yellow100">
            Join 6-10 members & 2 coordinators for 1-2 weeks at stunning Cabin
            Neighborhoods. Enjoy semi-curated coliving with group dinners, local
            trips, and free time. Gain Citizenship for full access to coliving
            network, flagship events, & perks.
          </JoinBody>
          <a
            href={EXTERNAL_LINKS.BOOKING_TYPEFORM}
            target="_blank"
            rel="noreferrer"
          >
            <Button>Join a Cabin Week</Button>
          </a>
        </JoinOptionContainer>
        <JoinOptionContainer>
          <JoinHeader withBottomMargin={false}>
            <JoinHeaderContainer>
              <Image
                src="/images/landing-member.svg"
                alt="member"
                width={43}
                height={43}
              />
              <JoinOptionTitleContainer>
                <JoinOptionTitle>Become a Member</JoinOptionTitle>
              </JoinOptionTitleContainer>
            </JoinHeaderContainer>
          </JoinHeader>
          <JoinBody $color="yellow100">
            Discover work/stay residencies, build your profile, collect passport
            stamps of your experiences, and access to the member directory,
            enriching your journey with diverse opportunities and connections.
          </JoinBody>
          <AuthenticatedLink href="/dashboard">
            <Button variant="secondary">Sign in</Button>
          </AuthenticatedLink>
        </JoinOptionContainer>
      </Content>
    </ParentContainer>
  )
}

const JoinBody = styled(Body1)`
  line-height: 1.5;
  font-weight: 400;
`

const JoinOptionTitle = styled.h3`
  font-size: 3.5rem;
  font-family: ${fonts.ibmPlexMono};
  color: ${({ theme }) => theme.colors.yellow100};
`

const JoinOptionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1,
  h6 {
    color: ${({ theme }) => theme.colors.yellow100} !important;
  }
`

const JoinHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: space-between;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 0;
  }
`

const Background = styled.div`
  position: absolute;
  background: url('/images/world-background.png') no-repeat center center;
  background-size: cover;
  mix-blend-mode: luminosity;
  width: 100%;
  height: 100%;
  opacity: 0.1;
`

const JoinOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: inherit 2.4rem 4rem;
  gap: 2.4rem;

  button {
    width: 100%;
  }

  &:first-child {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.green600};
  }

  ${({ theme }) => theme.bp.md} {
    border: 0.1rem solid ${({ theme }) => theme.colors.green600};
    width: 41.2rem;
  }
`

const JoinHeader = styled.div<{ withBottomMargin?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  ${H1} {
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${Body2} {
    opacity: 0.75;
  }

  img {
    margin-bottom: 1.6rem;
  }

  ${({ withBottomMargin }) => withBottomMargin && `margin-bottom: 1.6rem;`}

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 0;
    justify-content: center;
  }

  button {
    display: flex;
    margin: 0;
    align-self: flex-start;
    width: auto;
  }
`

const Content = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 10rem 0 5rem;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green800};

  ${({ theme }) => theme.bp.md} {
    padding-left: 12rem;
    padding-right: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0;
  }
`
