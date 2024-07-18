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
import { Identity } from './edit-profile/Identity'

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
        onChange={onChange}
      />
      <Contact
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
    <UpdateSection title="About">
      <AboutInput
        name={name}
        bio={bio}
        address={address}
        avatarUrl={avatarUrl}
        onNameChange={(name) => onChange({ ...profileEditParams, name })}
        onBioChange={(bio) => onChange({ ...profileEditParams, bio })}
        onAddressChange={(address) =>
          onChange({ ...profileEditParams, address })
        }
        onAvatarUrlChange={(avatarUrl) =>
          onChange({ ...profileEditParams, avatarUrl })
        }
      />
    </UpdateSection>
  )
}

const Contact = ({ profileEditParams, onChange, user }: UpdateProfileProps) => {
  const [contactList, setContactList] = useState<ContactFragmentType[]>([])

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
