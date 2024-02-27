import React from 'react'
import styled from 'styled-components'
import { InputText } from '../core/InputText'
import { InputTextArea } from '../core/InputTextArea'
import { MAX_BIO_LENGTH, MAX_LOCATION_LENGTH } from './constants'
import { validBio, validLocation } from './validations'
import { AvatarSetup } from '@/components/profile/AvatarSetup'
import { AvatarFragment } from '@/utils/types/profile'

interface AboutInputProps {
  bio: string
  location: string
  onBioChange: (bio: string) => void
  onLocationChange: (location: string) => void
  avatar?: AvatarFragment
  onAvatarChange?: (avatar: AvatarFragment | undefined) => void
}

export const AboutInput = ({
  bio,
  location,
  onBioChange,
  onLocationChange,
  avatar,
  onAvatarChange,
}: AboutInputProps) => {
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBioChange(e.target.value)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(e.target.value)
  }

  return (
    <SetupStepContainer>
      {onAvatarChange && (
        <AvatarSetup avatar={avatar} onNftSelected={onAvatarChange} />
      )}
      <StyledInputTextArea
        label="Bio"
        helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
        value={bio}
        onChange={handleBioChange}
        error={!validBio(bio)}
      />
      <InputText
        label="Location"
        helperText={`${location.length}/${MAX_LOCATION_LENGTH}`}
        value={location}
        onChange={handleLocationChange}
        error={!validLocation(location)}
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
