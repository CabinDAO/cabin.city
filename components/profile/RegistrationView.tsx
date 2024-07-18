import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Address } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useExternalUser } from '../auth/useExternalUser'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileNewParamsType, ProfileNewResponse } from '@/utils/types/profile'
import { AddressFragmentType } from '@/utils/types/location'
import { ErrorModal } from '../ErrorModal'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { RegistrationForm } from './RegistrationForm'

export interface RegistrationParams {
  email: string
  name: string
  address: AddressFragmentType
  avatarUrl: string
  subscribeToNewsletter: boolean
}

export const RegistrationView = () => {
  const router = useRouter()
  const { post } = useBackend()
  const { showModal } = useModal()
  const { showError } = useError()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { externalUser, isUserLoading } = useExternalUser()
  const { linkEmail } = usePrivy()
  const { user, refetchProfile } = useProfile({ redirectToIfFound: '/profile' })

  useEffect(() => {
    if (externalUser && !externalUser?.email?.address) {
      linkEmail()
    }
  }, [externalUser]) // don't add linkEmail() to deps. it causes a bug where useEffect is called many times and the popup never shows the screen to enter the code Privy emails you

  const handleSubmit = async (params: RegistrationParams) => {
    if (!isUserLoading && !externalUser) {
      confirmLoggedIn(() => {
        router.push('/registration')
      })
      return
    }

    if (!externalUser) {
      return
    }

    const walletAddress = externalUser.wallet?.address

    if (!params.avatarUrl) {
      showError('Avatar required')
      return
    }

    try {
      const resp = await post<ProfileNewResponse>('PROFILE_NEW', {
        walletAddress: walletAddress ? (walletAddress as Address) : undefined,
        name: params.name,
        email: externalUser.email?.address || params.email,
        address: params.address,
        avatarUrl: params.avatarUrl,
        subscribeToNewsletter: params.subscribeToNewsletter,
      } satisfies ProfileNewParamsType)

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
    <BaseLayout hideNavAndFooter>
      <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
      <ContentCard shape="notch">
        <RegistrationForm onSubmit={handleSubmit} />
      </ContentCard>
    </BaseLayout>
  )
}
