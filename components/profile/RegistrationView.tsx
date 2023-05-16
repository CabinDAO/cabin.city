import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { useAccount } from 'wagmi'
import Router, { useRouter } from 'next/router'
import { useSignAuthMessage } from '../hooks/useSignAuthMessage'
import { CreateProfileBody } from '@/pages/api/auth/create-profile'
import { ProfileAvatarInput } from '@/generated/graphql'
import { useModal } from '../hooks/useModal'
import { ErrorModal } from '../ErrorModal'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'

export interface RegistrationParams {
  email: string
  displayName: string
  avatar: ProfileAvatarInput | undefined
}

export const RegistrationView = () => {
  const { address } = useAccount()
  const router = useRouter()
  const { signAuthMessage } = useSignAuthMessage()
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()

  const handleSubmit = async (params: RegistrationParams) => {
    const { email, displayName: name, avatar } = params

    if (!address) {
      confirmLoggedIn(() => {
        router.push('/registration')
      })
      return
    }

    const { message, signature } = await signAuthMessage(address)

    const createProfileBody: CreateProfileBody = {
      message,
      signature,
      name,
      email,
      avatar,
    }

    const resp = await fetch('/api/auth/create-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createProfileBody),
    })
    const json = await resp.json()

    if (!resp.ok) {
      showModal(() => (
        <ErrorModal title="Profile Submission Error" description={json.error} />
      ))
    } else {
      Router.push(`/profile/${json.profileId}`)
    }
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
