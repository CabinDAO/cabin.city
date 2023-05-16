import { GetProfileByIdFragment } from '@/generated/graphql'
import { formatContactField } from '@/utils/display-utils'
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
  const { deviceSize } = useDeviceSize()

  return (
    <ProfileListContainer>
      <ContactFields>
        {contactFields.map((field) => (
          <Caption key={field.type}>{field.type}</Caption>
        ))}
      </ContactFields>
      <ContactFields>
        {contactFields.map((field) => (
          <CopyToClipboard key={field.type} text={field.value}>
            <Caption emphasized>
              {formatContactField(field, deviceSize !== 'tablet')}
            </Caption>
          </CopyToClipboard>
        ))}
      </ContactFields>
    </ProfileListContainer>
  )
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
