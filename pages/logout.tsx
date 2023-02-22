import { useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import { logOut } from '@/lib/auth/logout'

const LogoutPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    logOut().then(() => {
      router.push('/login')
    })
  }, [router])

  return null
}

export default LogoutPage
