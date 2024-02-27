import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileEditParams, ProfileEditResponse } from '@/utils/types/profile'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'
import { SetupStepForm } from './SetupStepForm'
import { AboutInput } from '../AboutInput'
import { validBio, validLocation } from '../validations'
import { useError } from '@/components/hooks/useError'

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const { showError } = useError()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')
  const [avatar, setAvatar] = useState(user?.avatar)

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    if (!avatar?.url) {
      showError('Please select an avatar photo')
      return
    }

    if (!validBio(bio)) {
      showError('Bio is too long')
      return
    }

    if (!validLocation(location)) {
      showError('Location is too long')
      return
    }

    await updateProfile({
      data: {
        bio,
        location,
        avatar,
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
        avatar={avatar}
        onAvatarChange={setAvatar}
      />
    </SetupStepForm>
  )
}
