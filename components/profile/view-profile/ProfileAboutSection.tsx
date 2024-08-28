import React from 'react'
import { formatShortAddress } from '@/lib/address'
import { ProfileFragment } from '@/utils/types/profile'
import { monthYearFormat } from '@/utils/display-utils'
import styled from 'styled-components'
import Icon, { IconName } from '../../core/Icon'
import { ContentCard } from '../../core/ContentCard'
import { Body1, Caption, H3 } from '../../core/Typography'
import { ProfileContactList } from './ProfileContactList'

export const ProfileAboutSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => (
  <ContentCard shape="notch">
    <Container>
      <AboutSection>
        <H3>About</H3>
        <ProfileDataGroup>
          <Datum
            iconName="date"
            captionContent={`Joined ${monthYearFormat(profile.createdAt)}`}
          />
          {profile.address && (
            <Datum
              iconName="location"
              captionContent={formatShortAddress(profile.address)}
            />
          )}
        </ProfileDataGroup>
        {profile.bio && <Body1>{profile.bio}</Body1>}
      </AboutSection>

      {profile.contactFields.length && (
        <ContactSection>
          <H3>Contact</H3>
          <ProfileContactList contactFields={profile.contactFields} />
        </ContactSection>
      )}
    </Container>
  </ContentCard>
)

const Datum = ({
  iconName,
  captionContent,
}: {
  iconName: IconName
  captionContent: React.ReactNode
}) => {
  if (!captionContent) {
    return null
  }
  return (
    <ProfileData>
      <Icon name={iconName} size={2} />
      <Caption>{captionContent}</Caption>
    </ProfileData>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;
  padding: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const ProfileDataGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`

const ProfileData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
`

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  height: 100%;
  width: 100%;
  padding: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    max-width: 60%;
  }
`

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.6rem 1.6rem 0;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 1.6rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding-left: 0;
    min-width: 35%;
  }
`
