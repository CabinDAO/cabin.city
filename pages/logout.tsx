import { useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import { logOut } from '@/lib/auth/logout'

const LogoutPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await logOut()

      // Force reload to clear apollo cache and prevent weird state updates
      ;(window as Window).location = '/login'
    })()
  }, [router])

  return null
}

export default LogoutPage
