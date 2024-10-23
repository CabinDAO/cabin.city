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
import { AvatarSetup } from '@/components/profile/AvatarSetup'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { Content, RichTextInput } from '@/components/editor/RichText'

export const AboutInput = ({
  values,
  onNameChange,
  onBioChange,
  onLongBioChange,
  onAddressChange,
  onAvatarCfIdChange,
  canShowErrors,
  disabled = false,
}: {
  values: {
    name: string
    bio: string
    longBio: string
    address: ProfileAddressFragmentType | undefined
    avatarCfId: string
  }
  onNameChange: (bio: string) => void
  onBioChange: (bio: string) => void
  onLongBioChange: (longBio: string) => void
  onAddressChange: (location: ProfileAddressFragmentType) => void
  onAvatarCfIdChange: (avatarCfId: string) => void
  canShowErrors: boolean
  disabled?: boolean
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBioChange(e.target.value)
  }

  const handleLongBioChange = (content: Content) => {
    onLongBioChange(JSON.stringify(content))
  }

  const handleAddressChange = (address: ProfileAddressFragmentType) => {
    onAddressChange(address)
  }

  const handleAvatarChange = (avatarCfId: string) => {
    onAvatarCfIdChange(avatarCfId)
  }

  return (
    <Container>
      <AvatarSetup
        avatarCfId={values.avatarCfId}
        onSelected={handleAvatarChange}
        error={canShowErrors && !values.avatarCfId}
        disabled={disabled}
        required
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

      <InputText
        label="Short Bio"
        required
        disabled={disabled}
        placeholder={'1-2 sentences about yourself'}
        value={values.bio}
        onChange={handleBioChange}
        helperText={`${values.bio.length}/${MAX_BIO_LENGTH}`}
        error={canShowErrors && !isValidBio(values.bio)}
        errorMessage={BIO_ERROR}
      />

      <RichTextInput
        label="Extended Bio"
        placeholder={'Tell your story. Decorate your profile. Go nuts!'}
        bottomHelpText={
          'What do you want your neighbors to know about you? What are you passionate about? How do you enjoy contributing to a community?'
        }
        initialContent={values.longBio}
        onChange={handleLongBioChange}
      />

      <LocationAutocompleteInput
        disabled={disabled}
        initialValue={toFullAddress(values.address)}
        placeholder={'What city do you spend most of your time in?'}
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
