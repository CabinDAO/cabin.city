import { Login } from '@/components/auth/Login'
import { H1 } from '@/components/core/Typography'
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout'

export default function Home() {
  return (
    <OnboardingLayout>
      <H1>Welcome to Cabin Census</H1>
      <Login />
    </OnboardingLayout>
  )
}
