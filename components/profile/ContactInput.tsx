import { ContactFieldType, ContactFragmentType } from '@/utils/types/profile'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Dropdown } from '@/components/core/Dropdown'
import Icon from '@/components/core/Icon'
import { InputText } from '@/components/core/InputText'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { sanitizeContactValue } from '@/components/profile/validations'
import { ProfileContactList } from '@/components/profile/view-profile/ProfileContactList'

const contactTypes = Object.values(ContactFieldType)
const dropdownOptions = contactTypes.map(
  (type) => ({ label: type, value: type } as SelectOption)
)

export const ContactInput = ({
  contactList,
  setContactList,
  setHasUnsavedChanges,
}: {
  contactList: ContactFragmentType[]
  setContactList: (contactList: ContactFragmentType[]) => void
  setHasUnsavedChanges?: (v: boolean) => void
}) => {
  const { deviceSize } = useDeviceSize()
  const [value, setValue] = useState('')
  const [contactTypeIndex, setContactTypeIndex] = useState(0)
  const [showError, setShowError] = useState(false)

  // track if there are unsaved changes
  useEffect(() => {
    if (setHasUnsavedChanges) {
      setHasUnsavedChanges(value.trim() != '')
    }
  }, [setHasUnsavedChanges, value])

  const addContact = () => {
    if (!value) {
      setShowError(true)
      return
    }

    const { sanitizedValue, error } = sanitizeContactValue(
      contactTypes[contactTypeIndex],
      value
    )

    setContactList([
      ...contactList,
      {
        type: contactTypes[contactTypeIndex],
        value: error ? value : sanitizedValue,
      },
    ])
    setContactTypeIndex(0)
    setValue('')
    setShowError(false)
  }

  const deleteContact = (index: number) => {
    const newContactList = [...contactList]
    newContactList.splice(index, 1)
    setContactList(newContactList)
  }

  return (
    <Container>
      <ProfileContactList
        contactFields={contactList}
        bigger
        onDelete={deleteContact}
      />
      <NewContact>
        <Inputs>
          <div style={{ flexShrink: '0' }}>
            <Dropdown
              placeholder="Select Contact Type"
              selectedOption={dropdownOptions[contactTypeIndex]}
              onSelect={(option) => {
                setContactTypeIndex(dropdownOptions.indexOf(option))
              }}
              label="Contact Type"
              options={dropdownOptions}
            />
          </div>
          <InputText
            label={
              contactFieldDisplayNameMapping[contactTypes[contactTypeIndex]]
            }
            placeholder={
              contactFieldPlaceholderMapping[contactTypes[contactTypeIndex]]
            }
            value={value}
            type={
              contactTypes[contactTypeIndex] === ContactFieldType.Email
                ? 'email'
                : 'text'
            }
            error={showError}
            onChange={(e) => {
              setShowError(false)
              setValue(e.target.value)
            }}
          />
          <ButtonWrap>
            <Button
              style={{ width: 'fit-content' }}
              variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
              onClick={addContact}
            >
              <Icon name={'plus'} size={1.6} />
              Add
            </Button>
          </ButtonWrap>
        </Inputs>
      </NewContact>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 3rem;
`

const NewContact = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    gap: 2.4rem;
    flex-direction: row;
  }
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const contactFieldDisplayNameMapping = {
  [ContactFieldType.Email]: 'Email',
  [ContactFieldType.Discord]: 'Discord Username',
  [ContactFieldType.Twitter]: 'Twitter Username',
  [ContactFieldType.Instagram]: 'Instagram Username',
  [ContactFieldType.LinkedIn]: 'LinkedIn URL',
  [ContactFieldType.Telegram]: 'Telegram Username',
  [ContactFieldType.Lens]: 'Lens Username',
  [ContactFieldType.Website]: 'Website URL',
  [ContactFieldType.Farcaster]: 'Farcaster Username',
}

const contactFieldPlaceholderMapping = {
  [ContactFieldType.Email]: 'you@example.com',
  [ContactFieldType.Discord]: 'yourhandle42',
  [ContactFieldType.Twitter]: 'yourhandle42',
  [ContactFieldType.Instagram]: 'instauser42',
  [ContactFieldType.LinkedIn]: 'https://www.linkedin.com/in/yourname/',
  [ContactFieldType.Telegram]: 'yourhandle42',
  [ContactFieldType.Lens]: 'yourhandle42',
  [ContactFieldType.Website]: 'https://cabin.city',
  [ContactFieldType.Farcaster]: 'yourhandle42',
}
