import { GetProfileByIdFragment } from '@/generated/graphql'
import { formatContactField } from '@/utils/display-utils'
import styled from 'styled-components'
import { CopyText } from '../core/CopyToClipboard'
import { Caption } from '../core/Typography'

interface ProfileContactListProps {
  contactFields: GetProfileByIdFragment['contactFields']
}
export const ProfileContactList = ({
  contactFields,
}: ProfileContactListProps) => {
  return (
    <ProfileListContainer>
      <ContactFields>
        {contactFields.map((field) => (
          <Caption key={field.type}>{field.type}</Caption>
        ))}
      </ContactFields>
      <ContactFields>
        {contactFields.map((field) => (
          <CopyText key={field.type} text={field.value}>
            <Caption emphasized>{formatContactField(field)}</Caption>
          </CopyText>
        ))}
      </ContactFields>
    </ProfileListContainer>
  )
}

const ProfileListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
`

const ContactFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
