import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { Body2, H2, Overline } from '@/components/core/Typography'
import { GetProfileByIdFragment } from '@/generated/graphql'
import {
  citizenshipInfoFromStatus,
  DEFAULT_CTA_TEXT,
} from '@/utils/citizenship'
import Link from 'next/link'
import styled from 'styled-components'

interface ProfileUnverifiedCitizenshipProps {
  profile: GetProfileByIdFragment
}

export const ProfileUnverifiedCitizenship = ({
  profile,
}: ProfileUnverifiedCitizenshipProps) => {
  // TODO: Replace with real link
  const href = 'https://cabin.city'

  const citizenCTAText =
    citizenshipInfoFromStatus(profile.citizenshipStatus)?.profileCTAText ??
    DEFAULT_CTA_TEXT

  return (
    <InnerContainer>
      <InformationContainer>
        <Circle>
          <Icon name="citizen" color="yellow600" size={4.5} />
        </Circle>
        <DescriptionContainer>
          <H2>Become a citizen</H2>
          <Body2>
            A digital and physical passport to explore the Cabin network. Join
            the growing community today and unlock some epic benefits.
          </Body2>
          <StyledAnchor href={href} target="_blank" rel="noreferrer">
            <Overline>Learn More</Overline>
            <Icon name="up-right-arrow" size={0.9} />
          </StyledAnchor>
        </DescriptionContainer>
      </InformationContainer>
      <Link href={'/citizenship'}>
        <Button variant="primary">{citizenCTAText}</Button>
      </Link>
    </InnerContainer>
  )
}

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  height: 100%;
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
`

const Circle = styled.div`
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  gap: 0.69rem;
  align-items: center;
  justify-content: flex-start;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;
  max-width: 60%;

  ${StyledAnchor} {
    margin-top: 0.6rem;
  }
`
