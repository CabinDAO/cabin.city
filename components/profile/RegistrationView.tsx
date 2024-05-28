import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileNewParamsType,
  AvatarFragmentType,
  ProfileNewResponse,
} from '@/utils/types/profile'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useExternalUser } from '../auth/useExternalUser'
import { useModal } from '../hooks/useModal'
import styled from 'styled-components'
import { MainContent } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { ErrorModal } from '../ErrorModal'
import { AddressFragmentType } from '@/utils/types/location'
import { Address } from 'viem'
import { useError } from '@/components/hooks/useError'

export interface RegistrationParams {
  email: string
  name: string
  address: AddressFragmentType
  avatar: AvatarFragmentType | undefined
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
    const { email, name, address, avatar } = params

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
    if (!walletAddress) {
      showError('No connected wallet found')
      return
    }

    const createProfileBody: ProfileNewParamsType = {
      walletAddress: walletAddress as Address,
      name,
      email: externalUser.email?.address || email,
      address,
      avatar,
    }

    try {
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
    <Container>
      <MainContent>
        <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
        <ContentCard shape="notch">
          <RegistrationForm onSubmit={handleSubmit} />
        </ContentCard>
      </MainContent>
    </Container>
  )
}

// TODO: instead of <Container> and <MainContent>, we should be using SingleColumnLayout and hiding the footer and nav sidebar

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: flex-start;
  align-items: center;
  gap: 4.8rem;
  padding: 2.5rem 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.5rem 8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0 1.6rem;
    justify-content: center;
  }
`
