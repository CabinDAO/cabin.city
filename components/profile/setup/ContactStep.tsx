import { useState } from 'react'
import { SetupStepForm } from './SetupStepForm'
import { StepProps } from './step-configuration'
import { ProfileContactField } from '@/generated/graphql'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { ContactInput } from '../ContactInput'
import { useUser } from '@/components/auth/useUser'

export const ContactStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()
  const [contactList, setContactList] = useState<ProfileContactField[]>([])
  const { updateProfile } = useUpdateProfile(user?._id)

  const handleNext = async () => {
    await updateProfile({
      data: {
        contactFields: contactList,
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
