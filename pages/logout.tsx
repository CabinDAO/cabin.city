import { useEffect } from 'react'

import type { NextPage } from 'next'
import { logOut } from '@/lib/auth/logout'

const LogoutPage: NextPage = () => {
  useEffect(() => {
    ;(async () => {
      await logOut()

      // Force reload to clear apollo cache and prevent weird state updates
      ;(window as Window).location = '/'
    })()
  }, [])

  return null
}

export default LogoutPage
