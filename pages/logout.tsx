import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/components/hooks/useAuth'

const LogoutPage: NextPage = () => {
  const { handleLogout } = useAuth()
  useEffect(() => {
    handleLogout()
  }, [handleLogout])

  return null
}

export default LogoutPage
