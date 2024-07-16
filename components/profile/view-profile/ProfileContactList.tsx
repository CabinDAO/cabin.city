import {
  formatContactField,
  getUrlFromContactField,
} from '@/utils/display-utils'
import styled from 'styled-components'
import { CopyToClipboard } from '../../core/CopyToClipboard'
import { Caption, WordBreak } from '../../core/Typography'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { ProfileFragment } from '@/utils/types/profile'

interface ProfileContactListProps {
  contactFields: ProfileFragment['contactFields']
}
export const ProfileContactList = ({
  contactFields,
}: ProfileContactListProps) => {
  return (
    <ProfileListContainer count={contactFields.length}>
      {contactFields.map((field) => (
        <>
          <Caption key={field.type} style={{ flexGrow: 0 }}>
            {field.type}
          </Caption>
          <div></div>
          <ContactField key={field.type} field={field} />
          <div></div>
        </>
      ))}
    </ProfileListContainer>
  )
}

interface ContactFieldProps {
  field: ProfileFragment['contactFields'][0]
}

const ContactField = ({ field }: ContactFieldProps) => {
  const { deviceSize } = useDeviceSize()
  const url = getUrlFromContactField(field)

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener nofollow noreferrer">
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

const ProfileListContainer = styled.div<{ count: number }>`
  display: grid;
  grid-template-rows: repeat(
    ${({ count }) => count},
    min-content 0.8rem min-content 2rem
  );
  width: 100%;
  word-break: break-word;

  ${({ theme }) => theme.bp.md} {
    grid-template-rows: initial;
    grid-template-columns: 10rem 1.6rem 1fr 0;
    row-gap: 1.6rem;
  }
`
