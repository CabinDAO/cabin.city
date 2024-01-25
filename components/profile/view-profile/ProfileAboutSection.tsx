import styled from 'styled-components'
import { ContentCard } from '../../core/ContentCard'
import { ResponsiveDivider } from '../../core/Divider'
import Icon, { IconName } from '../../core/Icon'
import { Body2, Caption, H3 } from '../../core/Typography'
import { ProfileContactList } from './ProfileContactList'
import { ProfileFragment } from '@/utils/types/profile'
import { monthYearFormat } from '@/utils/display-utils'

interface ProfileAboutSectionProps {
  profile: ProfileFragment
}

export const ProfileAboutSection = ({ profile }: ProfileAboutSectionProps) => (
  <ContentCard shape="notch">
    <Container>
      <AboutSubsection>
        <H3>About</H3>
        <ProfileDataGroup>
          <ProfileDataText
            iconName="date"
            captionText={`Joined ${monthYearFormat(profile.createdAt)}`}
          />
          <ProfileDataText
            iconName="location"
            captionText={profile.location ?? ''}
          />
        </ProfileDataGroup>
        {profile.bio && <Body2>{profile.bio}</Body2>}
      </AboutSubsection>
      {profile.contactFields.length ? (
        <ContactContainer>
          <ResponsiveDivider />
          <ContactSubsection>
            <H3>Contact</H3>
            <ProfileContactList contactFields={profile.contactFields} />
          </ContactSubsection>
        </ContactContainer>
      ) : null}
    </Container>
  </ContentCard>
)

interface ProfileDataTextProps {
  iconName: IconName
  captionText: string
}

const ProfileDataText = ({ iconName, captionText }: ProfileDataTextProps) => {
  if (!captionText.length) {
    return null
  }
  return (
    <ProfileData>
      <Icon name={iconName} size={1.4} />
      <Caption>{captionText}</Caption>
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
  --children-padding: 1.6rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 0;
    --children-padding: 3.2rem 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const ProfileDataGroup = styled.div`
  display: flex;
  flex-direction: row;
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

const AboutSubsection = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--children-padding);
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.lg} {
    max-width: 60%;
    padding: var(--children-padding);
  }
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
    padding-top: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    min-width: 35%;
    flex-direction: row;
    padding: 0;
  }
`

const ContactSubsection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
  padding: var(--children-padding);

  ${({ theme }) => theme.bp.md} {
    padding: 1.6rem 0;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: var(--children-padding);
  }
`
