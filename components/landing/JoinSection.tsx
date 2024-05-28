import styled from 'styled-components'
import { Body1, fonts } from '@/components/core/Typography'
import { LandingSectionContent } from './styles'
import Image from 'next/image'
import { Button } from '@/components/core/Button'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const JoinSection = () => {
  return (
    <ParentContainer>
      <Background></Background>
      <Content>
        <Option>
          <Image
            src="/images/landing-citizen.svg"
            alt="citizen"
            width={43}
            height={43}
          />
          <h3>Try Coliving</h3>
          <a href={EXTERNAL_LINKS.CABIN_WEEK_BOOKING_TYPEFORM}>
            <Button>Join a Cabin Week</Button>
          </a>
          <Body>
            Join 6-10 members & 2 coordinators for 1-2 weeks at stunning Cabin
            Neighborhoods. Enjoy semi-curated coliving with group dinners, local
            trips, and free time. Gain Citizenship for full access to coliving
            network, flagship events, & perks.
          </Body>
        </Option>
        <Option>
          <Image
            src="/images/landing-member.svg"
            alt="member"
            width={43}
            height={43}
          />
          <h3>Become a Member</h3>
          <AuthenticatedLink href="/activity">
            <Button variant="secondary">Sign Up</Button>
          </AuthenticatedLink>
          <Body>
            Discover work/stay residencies, build your profile, collect passport
            stamps of your experiences, and access to the member directory,
            enriching your journey with diverse opportunities and connections.
          </Body>
        </Option>
      </Content>
    </ParentContainer>
  )
}

const Body = styled(Body1)`
  color: ${({ theme }) => theme.colors.yellow100};
  line-height: 1.5;
`

const Option = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem 0 5rem;
  gap: 2.4rem;

  h3 {
    font-size: 3.5rem;
    font-family: ${fonts.ibmPlexMono};
    color: ${({ theme }) => theme.colors.yellow100};
  }

  button {
    width: 100%;
    align-self: end;
  }

  ${Body} {
    flex-grow: 1;
  }

  &:first-child {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.green600};
  }

  ${({ theme }) => theme.bp.md} {
    border: 0.1rem solid ${({ theme }) => theme.colors.green600};
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 41rem;
  }
`

const Content = styled(LandingSectionContent)`
  position: relative; // make sure content is above background without using z-index
  gap: 2rem;
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

const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green800};
`
