import { useState } from 'react'
import { useProfile } from '@/components/auth/useProfile'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import { isValidAddress, isValidBio } from '../validations'
import { StepProps } from './step-configuration'
import { SetupStepForm } from './SetupStepForm'
import { AboutInput } from '../AboutInput'

export const AboutStep = ({ stepName, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const { showError } = useError()
  const [name, setName] = useState(user?.name ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [address, setAddress] = useState(user?.address)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '')

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    if (!avatarUrl) {
      showError('Select an avatar photo')
      return
    }

    if (!isValidBio(bio)) {
      showError('Bio is too long')
      return
    }

    if (!isValidAddress(address)) {
      showError('Address required')
      return
    }

    await updateProfile({
      data: {
        bio,
        address,
        avatarUrl: avatarUrl,
      },
    } satisfies ProfileEditParamsType)

    onNext()
  }

  return (
    <SetupStepForm stepName={stepName} onNext={handleNext} onBack={onBack}>
      <AboutInput
        name={name}
        onNameChange={setName}
        bio={bio}
        onBioChange={setBio}
        address={address}
        onAddressChange={setAddress}
        avatarUrl={avatarUrl}
        onAvatarUrlChange={setAvatarUrl}
      />
    </SetupStepForm>
  )
}
