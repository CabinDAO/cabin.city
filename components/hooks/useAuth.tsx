import { FAUNA_TOKEN_LOCAL_STORAGE_KEY } from '@/lib/auth/constants'
import { User, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { apiGet } from '@/utils/api/backend'

export const useAuth = () => {
  const router = useRouter()
  const { logout } = usePrivy()

  const handleLogin = async (user: User) => {
    const privyDID = user.id
    // todo: security issue? this call lets anyone know we have an account for a did
    const resp = await apiGet('PROFILE_DID', { did: privyDID }, async () => {
      return null
    })

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
