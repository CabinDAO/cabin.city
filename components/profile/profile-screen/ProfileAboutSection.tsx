import { GetProfileByIdFragment } from '@/generated/graphql'
import { monthYearFormat } from '@/utils/display-utils'
import styled from 'styled-components'
import { ContentCard } from '../../core/ContentCard'
import { Divider } from '../../core/Divider'
import Icon, { IconName } from '../../core/Icon'
import { Body2, Caption, H3 } from '../../core/Typography'
import { ProfileContactList } from './ProfileContactList'

interface ProfileAboutSectionProps {
  profile: GetProfileByIdFragment
}

export const ProfileAboutSection = ({ profile }: ProfileAboutSectionProps) => (
  <ContentCard shape="notch">
    <Container>
      <AboutSubsection>
        <H3>About</H3>
        <ProfileDataGroup>
          <ProfileDataText
            iconName="date"
            captionText={monthYearFormat(profile.createdAt)}
          />
          <ProfileDataText
            iconName="location"
            captionText={profile.location ?? ''}
          />
        </ProfileDataGroup>
        {profile.bio && <Body2>{profile.bio}</Body2>}
      </AboutSubsection>
      {profile.contactFields.length && (
        <ContactContainer>
          <Divider></Divider>
          <ContactSubsection>
            <H3>Contact</H3>
            <ProfileContactList contactFields={profile.contactFields} />
          </ContactSubsection>
        </ContactContainer>
      )}
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
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;
  --children-padding: 3.2rem 2.4rem;
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
  max-width: 60%;
  height: 100%;
`

const ContactSubsection = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--children-padding);
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
`
