import { useRouter } from '@/components/hooks/useRouter'
import { ProfileView } from '@/components/profile/ProfileView'
import Error404 from '@/pages/404'

const ProfilePage = () => {
  const router = useRouter()
  const externId = router.query.id ? (router.query.id as string) : null

  if (!externId) {
    return <Error404 />
  }

  return <ProfileView externId={externId} />
}

export default ProfilePage
