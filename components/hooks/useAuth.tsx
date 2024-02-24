import { User, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { apiGet, NO_TOKEN } from '@/utils/api/backend'
import { ProfileDIDResponse } from '@/utils/types/profile'

export const useAuth = () => {
  const router = useRouter()
  const { logout } = usePrivy()

  const handleLogin = async (user: User, isNewUser: boolean) => {
    const privyDID = user.id
    // todo: security issue? this call lets anyone know we have an account for a did
    const data = await apiGet<ProfileDIDResponse>(
      'PROFILE_DID',
      { did: privyDID },
      NO_TOKEN
    )

    if ('error' in data) {
      console.log('error calling PROFILE_DID route', data.error)
    } else if (data.externId) {
      const currentPath = router.asPath

      if (currentPath === '/') {
        router.push('/dashboard').then()
      } else {
        router.push(router.asPath).then()
      }
    } else {
      router.push(`/registration`).then()
    }
  }

  const handleLogout = async () => {
    await logout()

    // Force reload to clear apollo cache and prevent weird state updates
    ;(window as Window).location = '/'
  }

  return { handleLogin, handleLogout }
}
