import React from 'react'
import { MeFragment, ProfileFragment } from '@/utils/types/profile'
import { formatShortAddress } from '@/lib/address'
import { monthYearFormat } from '@/utils/display-utils'
import styled from 'styled-components'
import { Body1, Caption, H3 } from '@/components/core/Typography'
import Icon, { IconName } from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { RichTextRender } from '@/components/editor/RichText'
import { HorizontalDivider } from '@/components/core/Divider'
import { ProfileContactList } from '@/components/profile/view-profile/ProfileContactList'
import { tagShortLabels } from '@/components/profile/TagsInput'

export const ProfileAboutSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  return (
    <ContentCard shape="notch">
      <Container>
        <Info>
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
              {profile.tags && (
                <Datum
                  iconName="hash"
                  captionContent={profile.tags
                    .map((tag) => tagShortLabels[tag])
                    .join(', ')}
                />
              )}
            </ProfileDataGroup>
            {profile.bio && <Bio>{profile.bio}</Bio>}
          </AboutSection>
          {!!profile.contactFields.length && (
            <ContactSection>
              <H3>Contact</H3>
              <ProfileContactList contactFields={profile.contactFields} />
            </ContactSection>
          )}
        </Info>
        {profile.longBio && (
          <>
            <StyledDivider />
            <ExtendedBio>
              <RichTextRender initialContent={profile.longBio} />
            </ExtendedBio>
          </>
        )}
      </Container>
    </ContentCard>
  )
}

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
  gap: 1.6rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const StyledDivider = styled(HorizontalDivider)`
  width: calc(100% - 3.2rem);
  margin: 0 1.6rem;
`

const ExtendedBio = styled.div`
  padding: 0 1.6rem 1.6rem;
`

const ProfileDataGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  column-gap: 2rem;
  row-gap: 1rem;
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
  gap: 1rem;
  height: 100%;
  width: 100%;
  padding: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    max-width: 60%;
    padding-bottom: 0;
  }
`

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.6rem 1.6rem 0;
  gap: 1rem;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 1.6rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding-left: 0;
    padding-bottom: 0;
    min-width: 35%;
  }
`
const Bio = styled(Body1)`
  padding: 1rem 0;
`
