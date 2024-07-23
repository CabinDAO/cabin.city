import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useProfile } from '../auth/useProfile'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ContactFieldType,
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import { sanitizeContactValue, validateProfileInput } from './validations'
import { EditProfileForm } from './EditProfileForm'
import { ContentCard } from '@/components/core/ContentCard'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ErrorModal } from '../ErrorModal'
import { ActionBar } from '@/components/core/ActionBar'

export const EditProfileView = () => {
  const router = useRouter()
  const { user } = useProfile({ redirectTo: '/' })
  const { showError } = useError()

  const { useMutate } = useBackend()
  const { trigger: updateUser } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const [newValues, setNewValues] = useState<ProfileEditParamsType['data']>({})
  const { showModal } = useModal()

  const handleSubmit = async () => {
    if (!newValues) return

    if (newValues.hasOwnProperty('contactFields') && newValues.contactFields) {
      newValues.contactFields = newValues.contactFields.filter(
        (contactField) => contactField.value !== ''
      )

      for (const i in newValues.contactFields) {
        const { sanitizedValue, error } = sanitizeContactValue(
          newValues.contactFields[i].type,
          newValues.contactFields[i].value
        )
        if (error) {
          showError(error)
          return
        }
        newValues.contactFields[i].value = sanitizedValue
      }
    }

    if (user && validateProfileInput(newValues)) {
      const res = await updateUser({
        data: newValues,
      } satisfies ProfileEditParamsType)

      const error = 'error' in res ? res.error : null

      if (!error) {
        await router.push(`/profile/${user.externId}`)
        return
      }

      showModal(() => (
        <ErrorModal
          title="Profile Submission Error"
          description={`Error updating profile: ${error}`}
        />
      ))
    }
  }

  const handleChange = (input: ProfileEditParamsType['data']) => {
    setNewValues((prev) => ({
      ...prev,
      ...input,
    }))
  }

  if (!user) {
    return null
  }

  return (
    <BaseLayout>
      <TitleCard
        title="Edit profile"
        icon="close"
        iconHref={`/profile/${user.externId}`}
      />
      <ContentCard shape="notch">
        <Content>
          <EditProfileForm
            user={user}
            profileEditParams={newValues}
            onChange={handleChange}
          />
          <ActionBar
            primaryButton={{
              label: 'Save Profile',
              onClick: handleSubmit,
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: () => router.push(`/profile/${user.externId}`).then(),
            }}
          />
        </Content>
      </ContentCard>
    </BaseLayout>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
