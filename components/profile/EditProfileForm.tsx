import React, { useEffect, useState } from 'react'
import {
  ProfileEditParams,
  RoleType,
  MeFragment,
  ContactFragment,
} from '@/utils/types/profile'
import styled from 'styled-components'
import { H3 } from '@/components/core/Typography'
import { HorizontalDivider } from '@/components/core/Divider'
import { AboutInput } from '@/components/profile/AboutInput'
import { ContactInput } from '@/components/profile/ContactInput'
import { Identity } from './edit-profile/Identity'

export interface UpdateProfileProps {
  user: MeFragment
  profileEditParams: ProfileEditParams['data'] | null
  onChange: (input: ProfileEditParams['data']) => void
}

export const EditProfileForm = ({
  user,
  profileEditParams,
  onChange,
}: {
  user: MeFragment
  profileEditParams: ProfileEditParams['data'] | null
  onChange: (input: ProfileEditParams['data']) => void
  onRolesChange: (roleTypes: RoleType[]) => void
}) => {
  if (!user) {
    return null
  }

  return (
    <InnerContainer>
      <Identity
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <HorizontalDivider />
      <About
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <HorizontalDivider />
      <Contact
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
    </InnerContainer>
  )
}

const About = ({ user, profileEditParams, onChange }: UpdateProfileProps) => {
  const bio = profileEditParams?.bio ?? user?.bio ?? ''
  const address = profileEditParams?.address ?? user?.address ?? undefined

  return (
    <UpdateSection title="About">
      <AboutInput
        bio={bio}
        address={address}
        onBioChange={(bio) => onChange({ ...profileEditParams, bio })}
        onAddressChange={(address) =>
          onChange({ ...profileEditParams, address })
        }
      />
    </UpdateSection>
  )
}

const Contact = ({ profileEditParams, onChange, user }: UpdateProfileProps) => {
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
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`
