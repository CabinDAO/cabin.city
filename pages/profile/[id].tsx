import { ProfileView } from '@/components/profile/ProfileView'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  return (
    <ProfileView
      externId={router.query.id ? (router.query.id as string) : ''}
    ></ProfileView>
  )
}

export default ProfilePage
