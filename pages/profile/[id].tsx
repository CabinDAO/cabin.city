import { ProfileView } from '@/components/profile/ProfileView'
import { useRouter } from '@/components/hooks/useRouter'

const ProfilePage = () => {
  const router = useRouter()
  return (
    <ProfileView
      externId={router.query.id ? (router.query.id as string) : ''}
    />
  )
}

export default ProfilePage
