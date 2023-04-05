import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useUser } from '../auth/useUser'
import { EditProfileForm } from './EditProfileForm'
import { useState } from 'react'
import {
  UpdateProfileInput,
  useUpdateProfileMutation,
  ProfileRoleType,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { validateProfileInput } from './validations'

export const EditProfileView = () => {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/login' })
  const [updateProfile] = useUpdateProfileMutation()
  const [editProfileInput, setEditProfileInput] = useState<UpdateProfileInput>(
    {}
  )
  const [roleTypes, setRoleTypes] = useState<ProfileRoleType[] | null>(null)

  const handleSubmit = async () => {
    if (!editProfileInput) return

    if (
      editProfileInput.hasOwnProperty('contactFields') &&
      editProfileInput.contactFields
    ) {
      editProfileInput.contactFields = editProfileInput.contactFields.filter(
        (contactField) => contactField.value !== ''
      )
    }

    if (user && validateProfileInput(editProfileInput)) {
      await updateProfile({
        variables: {
          id: user._id,
          data: editProfileInput,
          roleTypes,
        },
      })
      router.push(`/profile/${user._id}`)
    }
  }

  const handleRolesChange = (roleTypes: ProfileRoleType[]) => {
    if (!roleTypes) return
    setRoleTypes(roleTypes)
  }

  const handleChange = (input: UpdateProfileInput) => {
    setEditProfileInput((prev) => ({
      ...prev,
      ...input,
    }))
  }

  if (!user) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard
        title="Edit profile"
        icon="close"
        iconHref={`/profile/${user._id}`}
      />
      <ContentCard shape="notch">
        <EditProfileForm
          user={user}
          editProfileInput={editProfileInput}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onRolesChange={handleRolesChange}
        />
      </ContentCard>
    </SingleColumnLayout>
  )
}
