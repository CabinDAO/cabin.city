import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/components/auth/useAuth'

const LogoutPage: NextPage = () => {
  const { handleLogout } = useAuth()
  useEffect(() => {
    handleLogout()
  }, [handleLogout])

  return null
}

export default LogoutPage
