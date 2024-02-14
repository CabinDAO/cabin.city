import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileEditParams, ProfileEditResponse } from '@/utils/types/profile'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'
import { SetupStepForm } from './SetupStepForm'
import { AboutInput } from '../AboutInput'
import { validBio, validLocation } from '../validations'

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    if (!validBio(bio) || !validLocation(location)) {
      return
    }

    await updateProfile({
      data: {
        bio,
        location,
      },
    } as ProfileEditParams)

    onNext()
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <AboutInput
        bio={bio}
        location={location}
        onBioChange={setBio}
        onLocationChange={setLocation}
      />
    </SetupStepForm>
  )
}
