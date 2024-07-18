import React from 'react'
import { AddressFragmentType } from '@/utils/types/location'
import { ADDRESS_ERROR } from '@/utils/validate'
import {
  MAX_BIO_LENGTH,
  isValidAddress,
  isValidBio,
  isValidName,
  MAX_DISPLAY_NAME_LENGTH,
} from './validations'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { InputTextArea } from '@/components/core/InputTextArea'
import { AvatarSetup } from '@/components/profile/AvatarSetup'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'

interface AboutInputProps {
  name: string
  onNameChange: (bio: string) => void
  bio: string
  onBioChange: (bio: string) => void
  address?: AddressFragmentType
  onAddressChange: (location: AddressFragmentType) => void
  avatarUrl: string
  onAvatarUrlChange: (avatarUrl: string) => void
}

export const AboutInput = ({
  name,
  bio,
  address,
  onNameChange,
  onBioChange,
  onAddressChange,
  avatarUrl,
  onAvatarUrlChange,
}: AboutInputProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBioChange(e.target.value)
  }

  return (
    <SetupStepContainer>
      <AvatarSetup avatarUrl={avatarUrl} onSelected={onAvatarUrlChange} />
      <InputText
        error={!isValidName(name)}
        required
        label="Name"
        value={name}
        onChange={handleNameChange}
        helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
      />

      <InputTextArea
        label="Bio"
        helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
        value={bio}
        onChange={handleBioChange}
        error={!isValidBio(bio)}
      />

      <LocationAutocompleteInput
        initialValue={address}
        onLocationChange={onAddressChange}
        bottomHelpText={
          'Precise location will not be public. If nomadic, what city do you spend the biggest chunk of time?'
        }
        error={!isValidAddress(address)}
        errorMessage={ADDRESS_ERROR}
      />
    </SetupStepContainer>
  )
}

const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`
