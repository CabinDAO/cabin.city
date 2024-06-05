import React from 'react'
import styled from 'styled-components'
import { InputTextArea } from '@/components/core/InputTextArea'
import { MAX_BIO_LENGTH } from './constants'
import { isValidAddress, isValidBio } from './validations'
import { AvatarSetup } from '@/components/profile/AvatarSetup'
import { AvatarFragmentType } from '@/utils/types/profile'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { ADDRESS_ERROR } from '@/utils/validate'
import { AddressFragmentType } from '@/utils/types/location'

interface AboutInputProps {
  bio: string
  onBioChange: (bio: string) => void
  address?: AddressFragmentType
  onAddressChange: (location: AddressFragmentType) => void
  avatar?: AvatarFragmentType
  onAvatarChange?: (avatar: AvatarFragmentType | undefined) => void
}

export const AboutInput = ({
  bio,
  address,
  onBioChange,
  onAddressChange,
  avatar,
  onAvatarChange,
}: AboutInputProps) => {
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBioChange(e.target.value)
  }

  return (
    <SetupStepContainer>
      {onAvatarChange && (
        <AvatarSetup avatar={avatar} onSelected={onAvatarChange} />
      )}
      <StyledInputTextArea
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

const StyledInputTextArea = styled(InputTextArea)`
  height: 15.2rem;
`
