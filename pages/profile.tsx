import { useUser } from '@/components/auth/useUser'
import { ProfileView } from '@/components/profile/ProfileView'

const MyProfilePage = () => {
  const { user } = useUser({ redirectTo: 'home' })

  if (!user) return null

  return <ProfileView externId={user.externId} />
}

export default MyProfilePage
