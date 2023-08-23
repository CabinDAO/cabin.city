import styled from 'styled-components'
import { fonts } from '../core/Typography'
import { Button } from '@/components/core/Button'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import Image from 'next/image'
import Link from 'next/link'
import { useProfile } from '@/components/auth/useProfile'

export const TopLogoSection = () => {
  const { user } = useProfile()

  const profileId = user?._id

  return (
    <Background>
      <Content>
        <Logo href="/">
          <Image
            id={'cabin-logo'}
            src="/images/cabin.png"
            alt="Cabin Logo"
            width={56}
            height={56}
          />
          <Image
            src="/images/cabin-wordmark.svg"
            alt="Cabin"
            width={89}
            height={24}
          />
        </Logo>
        {!profileId && (
          <AuthenticatedLink href="/dashboard">
            <Button variant={'link'}>Log in &bull; Sign up</Button>
          </AuthenticatedLink>
        )}
      </Content>
    </Background>
  )
}

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
  width: 8.9rem;
  height: 5.6rem;
  flex-shrink: 0;
`
const Background = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
`

const Content = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
  height: 5.6rem;
  margin: auto;
  font-family: ${fonts.ibmPlexMono};

  Button {
    padding: 0 1.6rem 0 0;
  }

  ${({ theme }) => theme.bp.md} {
    padding: 8rem 2.4rem 8rem 12.8rem;
    max-width: 128rem;

    #cabin-logo {
      display: none;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    padding-left: 14rem;
  }
`
