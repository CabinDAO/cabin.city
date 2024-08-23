import React from 'react'
import {
  ProfileAddressFragmentType,
  toFullAddress,
  toProfileAddress,
} from '@/utils/types/profile'
import { ADDRESS_ERROR, BIO_ERROR } from '@/utils/validate'
import {
  MAX_BIO_LENGTH,
  isValidAddress,
  isValidBio,
  isValidName,
  MAX_DISPLAY_NAME_LENGTH,
  INVALID_NAME_MESSAGE,
} from './validations'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { InputTextArea } from '@/components/core/InputTextArea'
import { AvatarSetup } from '@/components/profile/AvatarSetup'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'

export const AboutInput = ({
  values,
  onNameChange,
  onBioChange,
  onAddressChange,
  onAvatarUrlChange,
  canShowErrors,
  disabled = false,
}: {
  values: {
    name: string
    bio: string
    address: ProfileAddressFragmentType | undefined
    avatarUrl: string
  }
  onNameChange: (bio: string) => void
  onBioChange: (bio: string) => void
  onAddressChange: (location: ProfileAddressFragmentType) => void
  onAvatarUrlChange: (avatarUrl: string) => void
  canShowErrors: boolean
  disabled?: boolean
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBioChange(e.target.value)
  }

  const handleAddressChange = (address: ProfileAddressFragmentType) => {
    onAddressChange(address)
  }

  const handleAvatarChange = (avatarUrl: string) => {
    onAvatarUrlChange(avatarUrl)
  }

  return (
    <Container>
      <AvatarSetup
        avatarUrl={values.avatarUrl}
        onSelected={handleAvatarChange}
        error={canShowErrors && !values.avatarUrl}
        disabled={disabled}
      />

      <InputText
        label="Name"
        required
        disabled={disabled}
        value={values.name}
        helperText={`${values.name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
        onChange={handleNameChange}
        error={canShowErrors && !isValidName(values.name)}
        errorMessage={INVALID_NAME_MESSAGE}
      />

      <InputTextArea
        label="Bio"
        required
        disabled={disabled}
        placeholder={'What do you want your neighbors to know about you?'}
        value={values.bio}
        onChange={handleBioChange}
        helperText={`${values.bio.length}/${MAX_BIO_LENGTH}`}
        error={canShowErrors && !isValidBio(values.bio)}
        errorMessage={BIO_ERROR}
      />

      <LocationAutocompleteInput
        disabled={disabled}
        initialValue={toFullAddress(values.address)}
        bottomHelpText={'What city do you spend most of your time in?'}
        onLocationChange={(address) =>
          handleAddressChange(toProfileAddress(address))
        }
        error={canShowErrors && !isValidAddress(values.address)}
        errorMessage={ADDRESS_ERROR}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`
