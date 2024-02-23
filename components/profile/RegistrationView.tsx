import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileNewParams } from '@/pages/api/v2/profile/new'
import { AvatarFragment, ProfileNewResponse } from '@/utils/types/profile'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useExternalUser } from '../auth/useExternalUser'
import { useModal } from '../hooks/useModal'
import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { ErrorModal } from '../ErrorModal'

export interface RegistrationParams {
  email: string
  displayName: string
  avatar: AvatarFragment | undefined
}

export const RegistrationView = () => {
  const router = useRouter()
  const { post } = useBackend()
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { externalUser, isUserLoading } = useExternalUser()
  const { linkEmail } = usePrivy()
  const { user, refetchProfile } = useProfile({ redirectToIfFound: '/profile' })

  useEffect(() => {
    if (!externalUser?.email?.address) {
      linkEmail()
    }
  }, [externalUser?.email?.address, linkEmail])

  const handleSubmit = async (params: RegistrationParams) => {
    const { email, displayName: name, avatar } = params

    if (!isUserLoading && !externalUser) {
      confirmLoggedIn(() => {
        router.push('/registration')
      })
      return
    }

    if (!externalUser) {
      return
    }

    try {
      const createProfileBody: ProfileNewParams = {
        address: externalUser.wallet?.address || '',
        name,
        email: externalUser.email?.address || email,
        avatar,
      }

      const resp = await post<ProfileNewResponse>(
        'PROFILE_NEW',
        createProfileBody
      )

      if ('error' in resp) {
        showModal(() => (
          <ErrorModal
            title="Profile Submission Error"
            description={resp.error ?? 'Error submitting profile'}
          />
        ))
        return
      } else {
        await refetchProfile()
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (user) {
    return null
  }

  return (
    <OnboardingLayout>
      <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
      <ContentCard shape="notch">
        <RegistrationForm onSubmit={handleSubmit} />
      </ContentCard>
    </OnboardingLayout>
  )
}
