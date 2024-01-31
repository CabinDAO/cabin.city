import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { useProfile } from '@/components/auth/useProfile'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { AboutInput } from '../AboutInput'
import { validBio, validLocation } from '../validations'
import { StepProps } from './step-configuration'

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')
  const { updateProfile } = useUpdateProfile(user?.externId)

  const handleNext = async () => {
    if (!validBio(bio) || !validLocation(location)) {
      return
    }

    await updateProfile({
      data: {
        bio,
        location,
      },
    })

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
