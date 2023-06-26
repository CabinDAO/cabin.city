import styled from 'styled-components'
import { Body2, H1, HHero, Subline1, body2Styles } from '../core/Typography'
import Image from 'next/image'
import { Button } from '../core/Button'
import { AuthenticatedLink } from '../core/AuthenticatedLink'
import {
  citizenBulletPoints,
  communityMemberBulletPoints,
} from '@/utils/landing'
import { usePriceInUsd } from '../hooks/usePriceInUsd'
import { useModal } from '../hooks/useModal'
import { CitizenshipModal } from './CitizenshipModal'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { useEffect } from 'react'

export const JoinSection = () => {
  const { priceInUsd } = usePriceInUsd()
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  const price = Math.round(priceInUsd)

  const handleLearnMoreClick = () => {
    showModal(() => <CitizenshipModal />)
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
                src="/images/landing-member.svg"
                alt="member"
                width={43}
                height={43}
              />
              <JoinOptionTitleContainer>
                <ConditionalTypographyText
                  key={deviceSize}
                  text="Community member"
                />
                <JoinOptionTitle $color="yellow100">Free</JoinOptionTitle>
              </JoinOptionTitleContainer>
            </JoinHeaderContainer>
            {isTablet && (
              <AuthenticatedLink href="/dashboard">
                <Button>Sign in</Button>
              </AuthenticatedLink>
            )}
          </JoinHeader>
          {!isTablet && (
            <AuthenticatedLink href="/dashboard">
              <Button>Sign in</Button>
            </AuthenticatedLink>
          )}
          <StyledList>
            {communityMemberBulletPoints.map((bulletPoint) => (
              <li key={bulletPoint}>{bulletPoint}</li>
            ))}
          </StyledList>
        </JoinOptionContainer>
        <JoinOptionContainer>
          <JoinHeader withBottomMargin={false}>
            <JoinHeaderContainer>
              <Image
                src="/images/landing-citizen.svg"
                alt="member"
                width={43}
                height={43}
              />
              <JoinOptionTitleContainer>
                <ConditionalTypographyText
                  key={deviceSize}
                  text="Founding Citizen"
                />
                <PriceContainer>
                  <JoinOptionTitle $color="yellow100">${price}</JoinOptionTitle>
                  <YearlyPrice $color="yellow100">/ year</YearlyPrice>
                </PriceContainer>
                <Body2 $color="yellow100">
                  0.2 ETH | pay with credit card or ethereum
                </Body2>
              </JoinOptionTitleContainer>
            </JoinHeaderContainer>
            {isTablet && (
              <Button onClick={handleLearnMoreClick} variant="secondary">
                Learn more
              </Button>
            )}
          </JoinHeader>
          {!isTablet && (
            <Button onClick={handleLearnMoreClick} variant="secondary">
              Learn more
            </Button>
          )}
          <StyledList>
            {citizenBulletPoints.map((bulletPoint) => (
              <li key={bulletPoint}>{bulletPoint}</li>
            ))}
          </StyledList>
        </JoinOptionContainer>
      </Content>
    </ParentContainer>
  )
}

const ConditionalTypographyText = ({ text }: { text: string }) => {
  const { deviceSize } = useDeviceSize()

  if (deviceSize === 'mobile') {
    return <Subline1 $color="yellow100">{text}</Subline1>
  }

  return <H1 $color="yellow100">{text}</H1>
}

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
`

const JoinOptionTitle = styled(HHero)`
  font-size: 4.8rem;
  margin-bottom: 0;
`

const JoinOptionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${H1}, ${Subline1} {
    color: ${({ theme }) => theme.colors.yellow100};
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

const StyledList = styled.ul`
  list-style: outside disc;
  margin-left: 2rem;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;

  li {
    ${body2Styles}
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${({ theme }) => theme.bp.md} {
    margin-left: 8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-left: 2rem;
  }
`

const YearlyPrice = styled(Body2)`
  font-size: 1.8rem;
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
  padding: 2.4rem;
  gap: 2.4rem;

  button {
    width: 100%;
  }

  padding-bottom: 4rem;

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
  padding: 5rem 0;
  padding-top: 10rem;
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
