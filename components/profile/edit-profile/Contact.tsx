import { ProfileContactField } from '@/generated/graphql'
import { useEffect, useState } from 'react'

import { ContactInput } from '../ContactInput'
import { UpdateProfileProps } from './UpdateProfileProps'
import { UpdateSection } from './UpdateSection'

export const Contact = ({
  editProfileInput,
  onChange,
  user,
}: UpdateProfileProps) => {
  const [contactList, setContactList] = useState<ProfileContactField[]>([])

  useEffect(() => {
    if (contactList.length) {
      onChange({ ...editProfileInput, contactFields: contactList })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList])

  return (
    <UpdateSection title="Contact">
      <ContactInput
        profile={user}
        contactList={contactList}
        setContactList={setContactList}
      />
    </UpdateSection>
  )
}
