import { useState } from 'react'
import { Address } from 'viem'
import { useRouter } from '@/components/hooks/useRouter'
import { useLocalStorage } from 'react-use'
import { useUser } from '@/components/auth/useUser'
import { useAuth } from '@/components/auth/useAuth'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileNewParamsType, ProfileNewResponse } from '@/utils/types/profile'
import {
  CURRENT_CLAIMABLE_STAMP,
  StampClaimParamsType,
  StampClaimResponse,
} from '@/utils/types/stamp'
import { STAMP_REMINDER_KEY } from '@/components/profile/StampClaimView'
import { ErrorModal } from '@/components/ErrorModal'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { RegistrationForm } from '@/components/profile/RegistrationForm'

export type RegistrationParams = Omit<
  ProfileNewParamsType,
  'email' | 'walletAddress'
>

export const RegistrationView = () => {
  const router = useRouter()
  const { post } = useBackend()
  const { showModal } = useModal()
  const { showError } = useError()
  const { confirmLoggedIn } = useAuth()
  const { externalUser, isUserLoading } = useExternalUser()
  const { user, refetchUser } = useUser({ redirectToIfFound: 'profile' })
  const [hasStampReminder, , removeReminder] =
    useLocalStorage<boolean>(STAMP_REMINDER_KEY)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  // const [email, setEmail] = useState('')
  // useEffect(() => {
  //   if (externalUser?.email?.address) {
  //     setEmail(externalUser.email.address)
  //   }
  // }, [externalUser, setEmail])

  const handleSubmit = async (params: RegistrationParams) => {
    if (!isUserLoading && !externalUser) {
      confirmLoggedIn(() => {
        router.push('registration')
      })
      return
    }

    if (!externalUser) {
      return
    }

    await refetchUser()

    if (!params.avatarCfId) {
      showError('Avatar required')
      return
    }

    const walletAddress = externalUser.wallet?.address
    const email = externalUser.email?.address
    if (!email) {
      showError('Privy email address is missing')
      return
    }

    try {
      setIsFormSubmitting(true)
      const resp = await post<ProfileNewResponse>('api_profile_new', {
        ...params,
        ...{
          walletAddress: walletAddress
            ? (walletAddress.toLowerCase() as Address)
            : undefined,
          email: email,
        },
      } satisfies ProfileNewParamsType)
      setIsFormSubmitting(false)

      if ('error' in resp) {
        if (resp.exists) {
          router.push('profile')
        } else {
          showModal(() => (
            <ErrorModal
              title="Profile Submission Error"
              description={resp.error ?? 'Error submitting profile'}
            />
          ))
        }
        return
      } else {
        if (CURRENT_CLAIMABLE_STAMP && hasStampReminder) {
          const res = await post<StampClaimResponse>('api_stamp_claim', {
            id: CURRENT_CLAIMABLE_STAMP.id,
          } satisfies StampClaimParamsType)

          if (res && !('error' in res) && res.success) {
            removeReminder()
          }
        }

        await refetchUser()
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (user) {
    return null
  }

  return (
    <BaseLayout hideNavAndFooter>
      <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
      <ContentCard shape="notch">
        <RegistrationForm
          onSubmit={handleSubmit}
          isSubmitting={isFormSubmitting}
        />
      </ContentCard>
    </BaseLayout>
  )
}
