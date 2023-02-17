import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useUser } from '../components/auth/useUser'

import type { NextPage } from 'next'
import { logOut } from '@/lib/auth/logout'

const LogoutPage: NextPage = () => {
  const { user } = useUser({ redirectTo: '/' })
  const router = useRouter()

  const handleLogOut = useCallback(async () => {
    // apolloClient.clearStore()
    await logOut()
    router.push('/')
  }, [router])

  useEffect(() => {
    if (user) {
      handleLogOut()
    }
  }, [user, handleLogOut])

  return null
}

export default LogoutPage
