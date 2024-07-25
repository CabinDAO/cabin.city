import React from 'react'
import {
  ProfileAddressFragmentType,
  toFullAddress,
  toProfileAddress,
} from '@/utils/types/profile'
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
  address: ProfileAddressFragmentType | undefined
  onAddressChange: (location: ProfileAddressFragmentType) => void
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
        label="Name"
        required
        value={name}
        helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
        onChange={handleNameChange}
        error={!isValidName(name)}
      />

      <InputTextArea
        label="Bio"
        required
        value={bio}
        helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
        onChange={handleBioChange}
        error={!isValidBio(bio)}
      />

      <LocationAutocompleteInput
        initialValue={toFullAddress(address)}
        bottomHelpText={'What city do you spend most of your time in?'}
        onLocationChange={(address) =>
          onAddressChange(toProfileAddress(address))
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
