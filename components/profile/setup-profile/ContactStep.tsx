import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { ContactFragmentType, ProfileEditResponse } from '@/utils/types/profile'
import { ContactInput } from '../ContactInput'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'
import { useBackend } from '@/components/hooks/useBackend'

export const ContactStep = ({ stepName, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const [contactList, setContactList] = useState<ContactFragmentType[]>([])
  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    const cleanUpContactList = contactList.filter(
      (contact) => contact.value !== ''
    )

    await updateProfile({
      data: {
        contactFields: cleanUpContactList,
      },
    })

    onNext()
  }

  if (!user) {
    return null
  }

  return (
    <SetupStepForm stepName={stepName} onNext={handleNext} onBack={onBack}>
      <ContactInput contactList={contactList} setContactList={setContactList} />
    </SetupStepForm>
  )
}
