import { InputText } from '@/components/core/InputText'
import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { StepProps } from './step-configuration'
import styled from 'styled-components'
import { Dropdown } from '@/components/core/Dropdown'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import {
  ProfileContactField,
  ProfileContactFieldType,
} from '@/generated/graphql'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { useUser } from '@/components/auth/useUser'

export const ContactStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()

  const initialSelections = user?.contactFields?.map((cf) => ({
    type: cf.type,
    value: cf.value,
  }))

  const [contactList, setContactList] = useState<ProfileContactField[]>(
    initialSelections?.length
      ? initialSelections
      : [
          {
            type: contactOptions[0].label as ProfileContactFieldType,
            value: '',
          },
        ]
  )
  const { updateProfile } = useUpdateProfile()

  const handleNext = async () => {
    await updateProfile({
      contactFields: contactList,
    })

    onNext()
  }

  const handleOnSelect = (value: SelectOption, position: number) => {
    setContactList((prev) => {
      const newContactList = [...prev]
      newContactList[position].type = value.label as ProfileContactFieldType
      return newContactList
    })
  }

  const addContactList = () => {
    setContactList((prev) => {
      const newContactList = [...prev]
      newContactList.push({
        type: contactOptions[0].label as ProfileContactFieldType,
        value: '',
      })
      return newContactList
    })
  }

  const deleteContactList = (position: number) => {
    setContactList((prev) => {
      const newContactList = [...prev]

      newContactList.splice(position, 1)
      return newContactList
    })
  }

  const handleInputTextChange = (value: string, position: number) => {
    setContactList((prev) => {
      const newContactList = [...prev]
      newContactList[position].value = value
      return newContactList
    })
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <SetupStepContainer>
        <ContactTypeGroup>
          {contactList.map((contact, index) => {
            return (
              <ContactTypePair key={index}>
                <Dropdown
                  placeholder="Select Contact Type"
                  selectedOption={contactOptions.find(
                    (co) => co.value === contact.type
                  )}
                  onSelect={(value: SelectOption) => {
                    handleOnSelect(value, index)
                  }}
                  label="Contact Type"
                  options={contactOptions}
                />
                <InputText
                  label={
                    fieldNameMapping[contact.type as ProfileContactFieldType]
                  }
                  value={contact.value}
                  onChange={(e) => handleInputTextChange(e.target.value, index)}
                />
                {contactList.length > 1 && (
                  <IconContainer onClick={() => deleteContactList(index)}>
                    <Icon name="trash" size={1.6} />
                  </IconContainer>
                )}
              </ContactTypePair>
            )
          })}
        </ContactTypeGroup>
        <Button variant="tertiary" onClick={addContactList}>
          Add link
        </Button>
      </SetupStepContainer>
    </SetupStepForm>
  )
}

export const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`

const ContactTypeGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  cursor: pointer;
`

const ContactTypePair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.8rem;
  width: 100%;
  gap: 2.4rem;
`

const fieldNameMapping = {
  [ProfileContactFieldType.Email]: 'Email',
  [ProfileContactFieldType.Discord]: 'Discord Username',
  [ProfileContactFieldType.Twitter]: 'Twitter Username',
  [ProfileContactFieldType.Instagram]: 'Instagram Username',
  [ProfileContactFieldType.LinkedIn]: 'Linkedin Username',
  [ProfileContactFieldType.Telegram]: 'Telegram Username',
  [ProfileContactFieldType.Lens]: 'Lens URL',
  [ProfileContactFieldType.Website]: 'Website URL',
}

const contactOptions = Object.values(ProfileContactFieldType).map(
  (type) =>
    ({
      label: type,
      value: type,
    } as SelectOption)
)
