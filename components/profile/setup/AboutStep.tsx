import { InputText } from '@/components/core/InputText'
import { InputTextArea } from '@/components/core/InputTextArea'
import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { StepProps } from './step-configuration'
import styled from 'styled-components'
import { useUser } from '@/components/auth/useUser'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'

const MAX_BIO_LENGTH = 300
const MAX_LOCATION_LENGTH = 30

const StyledInputTextArea = styled(InputTextArea)`
  height: 15.2rem;
`

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')
  const { updateProfile } = useUpdateProfile()

  const onBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_BIO_LENGTH) return
    setBio(e.target.value)
  }

  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LOCATION_LENGTH) return
    setLocation(e.target.value)
  }

  const handleNext = async () => {
    await updateProfile({
      bio,
      location,
    })

    onNext()
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <SetupStepContainer>
        <StyledInputTextArea
          label="Bio"
          helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
          value={bio}
          onChange={onBioChange}
        />
        <InputText
          label="Location"
          helperText={`${location.length}/${MAX_LOCATION_LENGTH}`}
          value={location}
          onChange={onLocationChange}
        />
      </SetupStepContainer>
    </SetupStepForm>
  )
}

export const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`
