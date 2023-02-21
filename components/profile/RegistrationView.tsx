import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { useAccount } from 'wagmi'
import Router from 'next/router'
import { useSignAuthMessage } from '../hooks/useSignAuthMessage'
import { CreateProfileBody } from '@/pages/api/auth/create-profile'
import { ProfileAvatarInput } from '@/generated/graphql'

export interface RegistrationParams {
  email: string
  displayName: string
  avatar: ProfileAvatarInput | undefined
}

export const RegistrationView = () => {
  const { address } = useAccount()
  const { signAuthMessage } = useSignAuthMessage()

  const handleSubmit = async (params: RegistrationParams) => {
    const { email, displayName: name, avatar } = params

    if (!address) throw new Error('No address found')

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

    if (!resp.ok) {
      throw new Error('Unable to create profile')
    }

    const json = await resp.json()
    Router.push(`/profile/${json.profileId}`)
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
