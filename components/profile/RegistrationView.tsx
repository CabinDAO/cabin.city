import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { useRouter } from 'next/router'
import { ProfileAvatarInput } from '@/generated/graphql'
import { useModal } from '../hooks/useModal'
import { ErrorModal } from '../ErrorModal'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useExternalUser } from '../auth/useExternalUser'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useEffect } from 'react'
import { ProfileNewParams } from '@/pages/api/v2/profile/new'
import { useBackend } from '@/components/hooks/useBackend'

export interface RegistrationParams {
  email: string
  displayName: string
  avatar: ProfileAvatarInput | undefined
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
        externalUserId: externalUser.id,
      }

      const resp = await post('PROFILE_NEW', createProfileBody)

      console.log(resp)

      if (!resp.externId) {
        showModal(() => (
          <ErrorModal
            title="Profile Submission Error"
            description={resp.error}
          />
        ))
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
