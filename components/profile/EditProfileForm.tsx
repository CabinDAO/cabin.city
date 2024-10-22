import React, { useEffect, useState } from 'react'
import {
  ProfileEditParamsType,
  MeFragment,
  ProfileFragment,
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
  profileToEdit: ProfileFragment
  profileEditParams: ProfileEditParamsType['data'] | null
  onChange: (input: ProfileEditParamsType['data']) => void
}

export const EditProfileForm = (props: UpdateProfileProps) => {
  return (
    <InnerContainer>
      <About {...props} />
      {props.user.externId == props.profileToEdit.externId && (
        <Identity {...props} />
      )}
      <Contact {...props} />
      <Tags {...props} />
    </InnerContainer>
  )
}

const About = ({
  profileToEdit,
  profileEditParams,
  onChange,
}: UpdateProfileProps) => {
  const name = profileEditParams?.name ?? profileToEdit?.name ?? ''
  const bio = profileEditParams?.bio ?? profileToEdit?.bio ?? ''
  const longBio = profileEditParams?.longBio ?? profileToEdit?.longBio ?? ''
  const address =
    profileEditParams?.address ?? profileToEdit?.address ?? undefined
  const avatarCfId =
    profileEditParams?.avatarCfId ?? profileToEdit?.avatarCfId ?? undefined

  return (
    <UpdateSection title="Basic Info">
      <AboutInput
        values={{
          name,
          bio,
          longBio,
          address,
          avatarCfId,
        }}
        onNameChange={(name) => onChange({ ...profileEditParams, name })}
        onBioChange={(bio) => onChange({ ...profileEditParams, bio })}
        onLongBioChange={(longBio) =>
          onChange({ ...profileEditParams, longBio })
        }
        onAddressChange={(address) =>
          onChange({ ...profileEditParams, address })
        }
        onAvatarCfIdChange={(avatarCfId) =>
          onChange({ ...profileEditParams, avatarCfId })
        }
        canShowErrors={true}
      />
    </UpdateSection>
  )
}

const Contact = ({
  profileEditParams,
  onChange,
  profileToEdit,
}: UpdateProfileProps) => {
  const [contactList, setContactList] = useState<ContactFragmentType[]>([])

  const initialSelections = profileToEdit.contactFields.map((cf) => ({
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

const Tags = ({
  profileToEdit,
  profileEditParams,
  onChange,
}: UpdateProfileProps) => {
  const tags = profileEditParams?.tags ?? profileToEdit?.tags ?? ''

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
  padding: 3.2rem 2.4rem;
  gap: 4rem;
`
