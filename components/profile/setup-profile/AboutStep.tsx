import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'
import { SetupStepForm } from './SetupStepForm'
import { AboutInput } from '../AboutInput'
import { isValidAddress, isValidBio } from '../validations'
import { useError } from '@/components/hooks/useError'

export const AboutStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const { showError } = useError()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [address, setAddress] = useState(user?.address)
  const [avatar, setAvatar] = useState(user?.avatar)
  const [neighborhoodExternId, setNeighborhoodExternId] = useState(
    user?.neighborhoodExternId
  )

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    if (!avatar?.url) {
      showError('Please select an avatar photo')
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
        avatar,
        neighborhoodExternId: neighborhoodExternId || null,
      },
    } as ProfileEditParamsType)

    onNext()
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <AboutInput
        bio={bio}
        onBioChange={setBio}
        address={address}
        onAddressChange={setAddress}
        avatar={avatar}
        onAvatarChange={setAvatar}
        neighborhoodExternId={neighborhoodExternId}
        onNeighborhoodChange={setNeighborhoodExternId}
      />
    </SetupStepForm>
  )
}
