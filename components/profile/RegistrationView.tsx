import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { useRouter } from 'next/router'
import { CreateProfileBody } from '@/pages/api/auth/create-profile'
import { ProfileAvatarInput } from '@/generated/graphql'
import { useModal } from '../hooks/useModal'
import { ErrorModal } from '../ErrorModal'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useExternalUser } from '../auth/useExternalUser'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useEffect } from 'react'

export interface RegistrationParams {
  email: string
  displayName: string
  avatar: ProfileAvatarInput | undefined
}

export const RegistrationView = () => {
  const router = useRouter()
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { externalUser, isUserLoading } = useExternalUser()
  const { getAccessToken, linkEmail } = usePrivy()
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
      const createProfileBody: CreateProfileBody = {
        address: externalUser.wallet?.address || '',
        name,
        email: externalUser.email?.address || email,
        avatar,
        externalUserId: externalUser.id,
      }

      const accessToken = await getAccessToken()

      const resp = await fetch('/api/auth/create-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createProfileBody),
      })
      const json = await resp.json()

      if (!resp.ok) {
        showModal(() => (
          <ErrorModal
            title="Profile Submission Error"
            description={json.error}
          />
        ))
      } else if (json.profileId) {
        refetchProfile()
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
