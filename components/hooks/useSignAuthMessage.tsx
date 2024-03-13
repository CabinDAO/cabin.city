import { useCallback, useEffect, useRef, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'

interface UseSignAuthMessageProps {
  prefetchNonce?: boolean
}

export function useSignAuthMessage(props: UseSignAuthMessageProps = {}) {
  const { prefetchNonce = false } = props

  const [nonce, setNonce] = useState<string | null>(null)
  const fetchingNonce = useRef<boolean>(false)
  const { chain: activeChain } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const fetchNonce = useCallback(async () => {
    const nonceRes = await fetch('/api/auth/nonce')
    return nonceRes.text()
  }, [])

  useEffect(() => {
    if (!prefetchNonce) {
      return
    }

    ;(async () => {
      if (fetchingNonce.current === true) {
        // block state-driven updates from triggering multiple fetches
        return
      }
      fetchingNonce.current = true

      try {
        const newNonce = await fetchNonce()
        setNonce(newNonce)
      } catch (error) {
        console.error(error)
      }

      fetchingNonce.current = false
    })()
  }, [prefetchNonce, fetchNonce])

  const signAuthMessage = useCallback(
    async (address: string) => {
      if (!address || !activeChain?.id) {
        throw new Error('Missing required parameters to sign auth message.')
      }

      const theNonce = nonce ?? (await fetchNonce())

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to Cabin Census App.',
        uri: window.location.origin,
        version: '1',
        chainId: activeChain?.id,
        nonce: theNonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      return { signature, message }
    },
    [activeChain?.id, nonce, signMessageAsync, fetchNonce]
  )

  return { signAuthMessage }
}
