import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { ProfileContactField } from '@/generated/graphql'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { ContactInput } from '../ContactInput'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'

export const ContactStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
  const [contactList, setContactList] = useState<ProfileContactField[]>([])
  const { updateProfile } = useUpdateProfile(user?._id)

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
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <ContactInput
        profile={user}
        contactList={contactList}
        setContactList={setContactList}
      />
    </SetupStepForm>
  )
}
