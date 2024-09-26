import { useState } from 'react'
import { useRouter } from '@/components/hooks/useRouter'
import { useLocalStorage } from 'react-use'
import { useUser } from '../auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import {
  sanitizeContactValue,
  validateProfileInput,
} from '@/components/profile/validations'
import {
  CURRENT_CLAIMABLE_STAMP,
  StampClaimParamsType,
  StampClaimResponse,
} from '@/utils/types/stamp'
import { STAMP_REMINDER_KEY } from '@/components/profile/StampClaimView'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ErrorModal } from '@/components/ErrorModal'
import { ActionBar } from '@/components/core/ActionBar'
import { EditProfileForm } from '@/components/profile/EditProfileForm'

export const EditProfileView = () => {
  const router = useRouter()
  const { user, refetchUser } = useUser({ redirectTo: 'home' })
  const { showError } = useError()

  const { post, useMutate } = useBackend()
  const { trigger: updateUser } = useMutate<ProfileEditResponse>(
    user ? ['api_profile_externId', { externId: user.externId }] : null
  )

  const [newValues, setNewValues] = useState<ProfileEditParamsType['data']>({})
  const { showModal } = useModal()
  const [hasStampReminder, , removeReminder] =
    useLocalStorage<boolean>(STAMP_REMINDER_KEY)

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
    } else if (user && user.contactFields.length < 1) {
      showError('At least one contact info is required')
      return
    }

    if (user && validateProfileInput(newValues)) {
      const res = await updateUser({
        data: newValues,
      } satisfies ProfileEditParamsType)

      const error = 'error' in res ? res.error : null

      if (error) {
        showModal(() => (
          <ErrorModal
            title="Profile Submission Error"
            description={`Error updating profile: ${error}`}
          />
        ))
        return
      }

      if (CURRENT_CLAIMABLE_STAMP && hasStampReminder) {
        const res = await post<StampClaimResponse>('api_stamp_claim', {
          id: CURRENT_CLAIMABLE_STAMP.id,
        } satisfies StampClaimParamsType)

        if (res && !('error' in res) && res.success) {
          removeReminder()
          await updateUser({})
        }
      }

      await router.push(['profile_id', { id: user.externId }])
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
              onClick: () =>
                router.push(['profile_id', { id: user.externId }]).then(),
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
