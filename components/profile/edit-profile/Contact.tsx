import { ContactFragment } from '@/utils/types/profile'
import { useEffect, useState } from 'react'
import { ContactInput } from '../ContactInput'
import { UpdateProfileProps } from './UpdateProfileProps'
import { UpdateSection } from './UpdateSection'

export const Contact = ({
  profileEditParams,
  onChange,
  user,
}: UpdateProfileProps) => {
  const [contactList, setContactList] = useState<ContactFragment[]>([])

  useEffect(() => {
    if (contactList.length) {
      onChange({ ...profileEditParams, contactFields: contactList })
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
