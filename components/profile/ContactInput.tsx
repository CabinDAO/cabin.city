import {
  MeFragment,
  ProfileContactField,
  ProfileContactFieldType,
} from '@/generated/graphql'
import { SetStateAction, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { Dropdown } from '../core/Dropdown'
import Icon from '../core/Icon'
import { InputText } from '../core/InputText'
import { SelectOption } from '../hooks/useDropdownLogic'
import { contactFieldDisplayNameMapping } from './setup/step-configuration'

const contactOptions = Object.values(ProfileContactFieldType).map(
  (type) =>
    ({
      label: type,
      value: type,
    } as SelectOption)
)

interface ContactInputProps {
  profile: MeFragment
  contactList: ProfileContactField[]
  setContactList: (contactList: SetStateAction<ProfileContactField[]>) => void
}

export const ContactInput = ({
  profile,
  contactList,
  setContactList,
}: ContactInputProps) => {
  const initialSelections = profile?.contactFields?.map((cf) => ({
    type: cf.type,
    value: cf.value,
  }))

  useEffect(() => {
    if (initialSelections.length) {
      setContactList(initialSelections)
    } else {
      setContactList([
        {
          type: contactOptions[0].label as ProfileContactFieldType,
          value: '',
        },
      ])
    }
  }, [])

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
                  contactFieldDisplayNameMapping[
                    contact.type as ProfileContactFieldType
                  ]
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
  )
}

const SetupStepContainer = styled.div`
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
