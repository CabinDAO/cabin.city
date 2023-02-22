import { UserRejectedRequestError } from 'wagmi'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { ConnectKitButton } from 'connectkit'
import { NoSsr } from '../core/NoSsr'
import { useSignAuthMessage } from '../hooks/useSignAuthMessage'
import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { Body1, H1, H3 } from '../core/Typography'
import { Button } from '../core/Button'
import { Circle } from '../core/Circle'
import Icon from '../core/Icon'

export const Login = () => {
  return (
    <NoSsr>
      <LoginContainer>
        <ContentCard shadow shape="notch">
          <LoginContentContainer>
            <Circle
              size={6.4}
              shadowMode="always"
              source="/images/welcome-logo.png"
            />
            <H1>Welcome to Cabin</H1>
            <Body1>Discover, build & explore within the Cabin network</Body1>
            <ConnectKitButton.Custom>
              {({ show, address, isConnected }) => (
                <SignInButton
                  onClick={show}
                  address={address}
                  isConnected={isConnected}
                />
              )}
            </ConnectKitButton.Custom>
            <CabinCityLink href="https://cabin.city">
              <Icon name="back-arrow" size={1.6} />
              <H3>Back to cabin.city</H3>
            </CabinCityLink>
          </LoginContentContainer>
        </ContentCard>
      </LoginContainer>
    </NoSsr>
  )
}

const LoginContainer = styled.div`
  margin: 3.2rem;
`

const LoginContentContainer = styled.div`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`

const CabinCityLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

class SignVerificationError extends Error {}

enum LoginStatus {
  INITIALIZING = 'INITIALIZING',
  CHECKING_PROFILE = 'CHECKING_PROFILE',
  AUTHENTICATING = 'AUTHENTICATING',
  FORWARDING = 'FORWARDING',
  ERROR = 'ERROR',
}

interface LoginState {
  cause: Error | null
  nonce: string | null
  status: LoginStatus
  profileId?: string | null
}

const initialLoginState: LoginState = {
  cause: null,
  nonce: null,
  status: LoginStatus.INITIALIZING,
}

interface SignInButtonProps {
  onClick: (() => void) | undefined
  address: string | undefined
  isConnected: boolean
}

const SignInButton = ({ onClick, isConnected, address }: SignInButtonProps) => {
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState)
  const { signAuthMessage } = useSignAuthMessage({ prefetchNonce: true })

  // 1. When connected, update status to move forward
  useEffect(() => {
    if (isConnected && loginState.status === LoginStatus.INITIALIZING) {
      setLoginState((s) => ({ ...s, status: LoginStatus.CHECKING_PROFILE }))
    }
  }, [isConnected, loginState.status])

  // 2. Check if a profile is associated with the address
  useEffect(() => {
    if (loginState.status !== LoginStatus.CHECKING_PROFILE) {
      return
    }

    ;(async () => {
      try {
        const resp = await fetch(`/api/${address}/profile-id`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const { profileId } = await resp.json()

        if (profileId) {
          setLoginState((s) => ({
            ...s,
            status: LoginStatus.AUTHENTICATING,
            profileId,
          }))
        } else {
          setLoginState((s) => ({
            ...s,
            status: LoginStatus.FORWARDING,
          }))
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [loginState.status, address])

  // 3. Authenticate with SIWE
  useEffect(() => {
    if (loginState.status !== LoginStatus.AUTHENTICATING) {
      return
    }
    if (!address) {
      throw new Error('No address found')
    }
    ;(async () => {
      try {
        const { message, signature } = await signAuthMessage(address)

        const verifyResponse = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
        })

        if (!verifyResponse.ok) {
          throw new SignVerificationError('Unable to verify sign message')
        }
        setLoginState((s) => ({
          ...s,
          status: LoginStatus.FORWARDING,
        }))
      } catch (error: unknown) {
        if (error instanceof UserRejectedRequestError) {
          // user rejected, do nothing
          return
        }

        if (error instanceof SignVerificationError) {
          // nonce likely expired, restart flow
          setLoginState(initialLoginState)
          return
        }

        if (error instanceof Error) {
          setLoginState((s) => ({
            ...s,
            cause: error as Error,
            status: LoginStatus.ERROR,
          }))
        }
      }
    })()
  }, [loginState.status, address, signAuthMessage])

  // 4. Forward appropriately
  useEffect(() => {
    if (loginState.status === LoginStatus.FORWARDING) {
      Router.push(loginState.profileId ? '/dashboard' : '/registration')
    }
  }, [loginState.status, loginState.profileId])

  const handleClick = () => {
    if (!isConnected && onClick) {
      // get wallet connection
      onClick()
    } else {
      // start authentication over, retaining wallet connection
      setLoginState(initialLoginState)
    }
  }

  return <Button onClick={handleClick}>Sign in with Ethereum</Button>
}
