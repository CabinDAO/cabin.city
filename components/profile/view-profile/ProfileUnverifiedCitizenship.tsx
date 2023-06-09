import { AppLink } from '@/components/core/AppLink'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { Body2, H2, Overline } from '@/components/core/Typography'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { GetProfileByIdFragment } from '@/generated/graphql'
import {
  citizenshipInfoFromStatus,
  DEFAULT_CTA_TEXT,
} from '@/utils/citizenship'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import Link from 'next/link'
import styled from 'styled-components'

interface ProfileUnverifiedCitizenshipProps {
  profile: GetProfileByIdFragment
}

export const ProfileUnverifiedCitizenship = ({
  profile,
}: ProfileUnverifiedCitizenshipProps) => {
  const { deviceSize } = useDeviceSize()

  const citizenCTAText =
    citizenshipInfoFromStatus(profile.citizenshipStatus)?.profileCTAText ??
    DEFAULT_CTA_TEXT

  return (
    <InnerContainer>
      <InformationContainer>
        <Circle>
          <Icon
            name="citizen"
            color="yellow600"
            size={deviceSize === 'desktop' ? 4.5 : 2.2}
          />
        </Circle>
        <DescriptionContainer>
          <H2>Become a citizen</H2>
          <Body2>
            A digital and physical passport to explore the Cabin network. Join
            the growing community today and unlock some epic benefits.
          </Body2>
          <AppLink
            external
            location={EXTERNAL_LINKS.CITIZENSHIP}
            iconSize={0.9}
          >
            <Overline>Learn More</Overline>
          </AppLink>
        </DescriptionContainer>
      </InformationContainer>
      <StyledLink href={'/citizenship'}>
        <CitizenCTAButton variant="primary">{citizenCTAText}</CitizenCTAButton>
      </StyledLink>
    </InnerContainer>
  )
}

const StyledLink = styled(Link)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
    margin: 0.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin: 0;
  }
`

const CitizenCTAButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  padding: 3.2rem 1.6rem;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2.4rem;
    gap: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    align-items: center;
  }
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    align-items: flex-start;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const Circle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.bp.lg} {
    width: 9.6rem;
    height: 9.6rem;
  }
`

const DescriptionContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  max-width: 100%;

  a {
    margin-top: 0.6rem;
  }

  ${({ theme }) => theme.bp.md} {
    text-align: left;
    align-items: flex-start;
    max-width: 85%;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 62%;
  }
`
