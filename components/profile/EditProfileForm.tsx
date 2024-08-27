import React, { useEffect, useState } from 'react'
import {
  ProfileEditParamsType,
  MeFragment,
  ContactFragmentType,
} from '@/utils/types/profile'
import styled from 'styled-components'
import { H3 } from '@/components/core/Typography'
import { AboutInput } from '@/components/profile/AboutInput'
import { ContactInput } from '@/components/profile/ContactInput'
import { Identity } from '@/components/profile/edit-profile/Identity'
import { TagsInput } from '@/components/profile/TagsInput'

export interface UpdateProfileProps {
  user: MeFragment
  profileEditParams: ProfileEditParamsType['data'] | null
  onChange: (input: ProfileEditParamsType['data']) => void
}

export const EditProfileForm = ({
  user,
  profileEditParams,
  onChange,
}: {
  user: MeFragment
  profileEditParams: ProfileEditParamsType['data'] | null
  onChange: (input: ProfileEditParamsType['data']) => void
}) => {
  if (!user) {
    return null
  }

  return (
    <InnerContainer>
      <About
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <Identity
        user={user}
        profileEditParams={profileEditParams}
        onChange={() => null}
      />
      <Contact
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <Tags
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
    </InnerContainer>
  )
}

const About = ({ user, profileEditParams, onChange }: UpdateProfileProps) => {
  const name = profileEditParams?.name ?? user?.name ?? ''
  const bio = profileEditParams?.bio ?? user?.bio ?? ''
  const address = profileEditParams?.address ?? user?.address ?? undefined
  const avatarUrl = profileEditParams?.avatarUrl ?? user?.avatarUrl ?? undefined

  return (
    <UpdateSection title="Basic Info">
      <AboutInput
        values={{
          name,
          bio,
          address,
          avatarUrl,
        }}
        onNameChange={(name) => onChange({ ...profileEditParams, name })}
        onBioChange={(bio) => onChange({ ...profileEditParams, bio })}
        onAddressChange={(address) =>
          onChange({ ...profileEditParams, address })
        }
        onAvatarUrlChange={(avatarUrl) =>
          onChange({ ...profileEditParams, avatarUrl })
        }
        canShowErrors={true}
      />
    </UpdateSection>
  )
}

const Contact = ({ profileEditParams, onChange, user }: UpdateProfileProps) => {
  const [contactList, setContactList] = useState<ContactFragmentType[]>([])

  const initialSelections = user.contactFields.map((cf) => ({
    type: cf.type,
    value: cf.value,
  }))

  useEffect(() => {
    if (initialSelections.length) {
      setContactList(initialSelections)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (contactList.length) {
      onChange({ ...profileEditParams, contactFields: contactList })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList])

  return (
    <UpdateSection title="Contact Info">
      <ContactInput contactList={contactList} setContactList={setContactList} />
    </UpdateSection>
  )
}

const Tags = ({ user, profileEditParams, onChange }: UpdateProfileProps) => {
  const tags = profileEditParams?.tags ?? user?.tags ?? ''

  return (
    <UpdateSection title="About me">
      <TagsInput
        tags={tags}
        onTagsChange={(tags) => onChange({ ...profileEditParams, tags })}
        canShowErrors={true}
      />
    </UpdateSection>
  )
}

export const UpdateSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <UpdateSectionContainer>
      <H3>{title}</H3>
      {children}
    </UpdateSectionContainer>
  )
}

const UpdateSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`
