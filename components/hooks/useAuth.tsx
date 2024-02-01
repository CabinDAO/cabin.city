import { FAUNA_TOKEN_LOCAL_STORAGE_KEY } from '@/lib/auth/constants'
import { User, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { useBackend } from '@/components/hooks/useBackend'

export const useAuth = () => {
  const router = useRouter()
  const { logout } = usePrivy()
  const { get } = useBackend()

  const handleLogin = async (user: User) => {
    const privyDID = user.id
    const resp = await get('PROFILE_DID', { did: privyDID })

    const { externId } = await resp

    if (!externId) {
      router.push(`/registration`)
    } else {
      const currentPath = router.asPath

      if (currentPath === '/') {
        router.push('/dashboard')
      } else {
        router.push(router.asPath)
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem(FAUNA_TOKEN_LOCAL_STORAGE_KEY)

    // Force reload to clear apollo cache and prevent weird state updates
    ;(window as Window).location = '/'
  }

  return { handleLogin, handleLogout }
}
