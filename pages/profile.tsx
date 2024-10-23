import { useUser } from '@/components/auth/useUser'
import { useRouter } from '@/components/hooks/useRouter'

const MyProfilePage = () => {
  const { user } = useUser({ redirectTo: 'home' })
  const router = useRouter()

  if (!user) return null

  router.push(['profile_id', { id: user.externId }]).then()
}

export default MyProfilePage
