import { User, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { apiGet, apiPost, NO_TOKEN } from '@/utils/api/backend'
import { ProfileDIDResponse, ProfileNewResponse } from '@/utils/types/profile'
import { getCookieValue } from '@/utils/cookie'
import { ProfileNewParams } from '@/pages/api/v2/profile/new'
import { InviteResponse } from '@/utils/types/partialInviteClaim'
import { getAccessToken } from '@privy-io/react-auth'

export const useAuth = () => {
  const router = useRouter()
  const { logout } = usePrivy()

  const handleLogin = async (user: User, isNewUser: boolean) => {
    const claimExternId = isNewUser
      ? getCookieValue(document.cookie, 'cabinClaimExternId')
      : null

    const privyDID = user.id
    // todo: security issue? this call lets anyone know we have an account for a did
    const data = await apiGet<ProfileDIDResponse>(
      'PROFILE_DID',
      { did: privyDID },
      NO_TOKEN
    )

    if ('error' in data) {
      console.log('error calling PROFILE_DID route', data.error)
    } else if (data.externId || claimExternId) {
      if (claimExternId) {
        const shouldEraseCookie = await createUser(user, claimExternId)
        if (shouldEraseCookie) {
          document.cookie = `cabinClaimExternId=; Expires=Fri, Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Path=/`
        }
      }

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

// make sure we are authed with privy when we call this
async function createUser(user: User, claimExternId: string) {
  const claim = await apiGet<InviteResponse>(
    ['INVITE', { externId: claimExternId }],
    {},
    getAccessToken
  )

  if ('error' in claim) {
    console.error(claim.error)
    return false
  }

  if (!claim.externId) {
    return true // just erase cookie. idk how we get into this state. not much to do here
  }

  const createProfileBody: ProfileNewParams = {
    address: user.wallet?.address || '',
    name: claim.name,
    email: user.email?.address || claim.email,
    claimedInviteExternId: claim.externId,
  }

  const profile = await apiPost<ProfileNewResponse>(
    'PROFILE_NEW',
    createProfileBody,
    getAccessToken
  )

  if ('error' in profile) {
    console.error(profile.error)
    return false
  }

  return true
}
