import {
  GetProfileByIdFragment,
  ProfileContactField,
} from '@/generated/graphql'
import {
  formatContactField,
  getUrlFromContactField,
} from '@/utils/display-utils'
import styled from 'styled-components'
import { CopyToClipboard } from '../../core/CopyToClipboard'
import { Caption } from '../../core/Typography'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

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
          <ContactField key={field.type} field={field} />
        ))}
      </ContactFields>
    </ProfileListContainer>
  )
}

interface ContactFieldProps {
  field: ProfileContactField
}

const ContactField = ({ field }: ContactFieldProps) => {
  const { deviceSize } = useDeviceSize()
  const url = getUrlFromContactField(field)

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        <Caption emphasized>{formatContactField(field)}</Caption>
      </a>
    )
  } else {
    return (
      <CopyToClipboard text={field.value}>
        <Caption emphasized>
          {formatContactField(field, deviceSize !== 'tablet')}
        </Caption>
      </CopyToClipboard>
    )
  }
}

const ProfileListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    display: flex;
    flex-direction: row;
    gap: 6rem;
  }
`

const ContactFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
