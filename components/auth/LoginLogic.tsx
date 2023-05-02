import { useEffect, useState } from 'react'
import { disconnect } from '@wagmi/core'
import { useSignAuthMessage } from '../hooks/useSignAuthMessage'
import { useModal } from '../hooks/useModal'
import { getFaunaSecret } from '@/lib/auth/getFaunaSecret'
import { UserRejectedRequestError } from 'wagmi'
import Router from 'next/router'

class SignVerificationError extends Error {}

export enum LoginStatus {
  INITIALIZING = 'INITIALIZING',
  CHECKING_PROFILE = 'CHECKING_PROFILE',
  AUTHENTICATING = 'AUTHENTICATING',
  AWAITING_SIGNATURE = 'AWAITING_SIGNATURE',
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

interface LoginLogicProps {
  show?: (() => void) | undefined
  address?: string | undefined
  isConnected: boolean
  onLogin?: () => void
  children: (renderProps: {
    startAuthentication?: () => void
    loginState: LoginState
  }) => React.ReactNode
}

export const LoginLogic = (props: LoginLogicProps) => {
  const { show, isConnected, address, onLogin, children } = props
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState)
  const { signAuthMessage } = useSignAuthMessage({ prefetchNonce: true })
  const { hideModal } = useModal()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Disconnect before displaying login to prevent message signing request before the user does anything
    disconnect().then(() => {
      setInitialized(true)
    })
  }, [])

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
        setLoginState((s) => ({
          ...s,
          status: LoginStatus.ERROR,
          cause: err as Error,
        }))
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
        setLoginState((s) => ({
          ...s,
          status: LoginStatus.AWAITING_SIGNATURE,
        }))
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

        // Attempt to get fauna secret to confirm user is properly authenticated before proceeding
        const faunaSecret = await getFaunaSecret()
        if (faunaSecret) {
          setLoginState((s) => ({
            ...s,
            status: LoginStatus.FORWARDING,
          }))
        } else {
          throw new Error('Unable to get fauna secret')
        }
      } catch (error: unknown) {
        if (error instanceof UserRejectedRequestError) {
          // user rejected, no longer awaiting signature
          setLoginState((s) => ({
            ...s,
            status: LoginStatus.ERROR,
          }))
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
      hideModal()
      if (!loginState.profileId) {
        Router.push('/registration')
      } else if (onLogin) {
        onLogin()
      }
    }
  }, [loginState.status, loginState.profileId, hideModal, onLogin])

  const startAuthentication = () => {
    if (!isConnected && show) {
      // get wallet connection
      show()
    } else {
      // start authentication over, retaining wallet connection
      setLoginState(initialLoginState)
    }
  }

  if (!initialized) {
    return null
  }

  return <>{children({ startAuthentication, loginState })}</>
}
