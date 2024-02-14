import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useProfile } from '../auth/useProfile'
import { useModal } from '../hooks/useModal'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParams,
  ProfileEditResponse,
  RoleType,
} from '@/utils/types/profile'
import { validateProfileInput } from './validations'
import { EditProfileForm } from './EditProfileForm'
import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ErrorModal } from '../ErrorModal'
import { ActionBar } from '../core/ActionBar'

export const EditProfileView = () => {
  const router = useRouter()
  const { user } = useProfile({ redirectTo: '/' })

  const { useMutate } = useBackend()
  const { trigger: updateUser } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const [newValues, setNewValues] = useState<ProfileEditParams['data']>({})
  const [roleTypes, setRoleTypes] = useState<RoleType[] | null>(null)
  const { showModal } = useModal()

  const handleSubmit = async () => {
    if (!newValues) return

    if (newValues.hasOwnProperty('contactFields') && newValues.contactFields) {
      newValues.contactFields = newValues.contactFields.filter(
        (contactField) => contactField.value !== ''
      )
    }

    if (user && validateProfileInput(newValues)) {
      const res = await updateUser({
        data: newValues,
        roleTypes,
      } as ProfileEditParams)

      if (!res.error) {
        await router.push(`/profile/${user.externId}`)
        return
      }

      showModal(() => (
        <ErrorModal
          title="Profile Submission Error"
          description={`Error updating profile: ${res.error}`}
        />
      ))
    }
  }

  const handleRolesChange = (roleTypes: RoleType[]) => {
    if (!roleTypes) return
    setRoleTypes(roleTypes)
  }

  const handleChange = (input: ProfileEditParams['data']) => {
    setNewValues((prev) => ({
      ...prev,
      ...input,
    }))
  }

  if (!user) {
    return null
  }

  return (
    <StyledLayout
      actionBar={
        <ActionBar
          primaryButton={{
            label: 'Save Profile',
            onClick: handleSubmit,
          }}
        />
      }
    >
      <TitleCard
        title="Edit profile"
        icon="close"
        iconHref={`/profile/${user.externId}`}
      />
      <ContentCard shape="notch">
        <EditProfileForm
          user={user}
          profileEditParams={newValues}
          onChange={handleChange}
          onRolesChange={handleRolesChange}
        />
      </ContentCard>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  padding-bottom: 11.5rem;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 17rem;
  }
`
