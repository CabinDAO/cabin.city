import { useProfile } from '@/components/auth/useProfile'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LandingView } from '@/components/landing/LandingView'

export default function Home() {
  const router = useRouter()
  const { user, isUserLoading } = useProfile()

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard')
    }
  }, [isUserLoading, user, router])

  // TODO: Add loading state
  if (isUserLoading) {
    return null
  }

  return <LandingView />
}
