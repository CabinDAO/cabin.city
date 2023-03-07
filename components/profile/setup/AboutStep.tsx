import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { StepProps } from './step-configuration'
import { useUser } from '@/components/auth/useUser'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { AboutInput } from '../AboutInput'

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')
  const { updateProfile } = useUpdateProfile()

  const handleNext = async () => {
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
