import { useProfile } from '@/components/auth/useProfile'
import { ProfileView } from '@/components/profile/ProfileView'

const MyProfilePage = () => {
  const { user } = useProfile({ redirectTo: '/' })

  if (!user) return null

  return <ProfileView externId={user.externId} />
}

export default MyProfilePage
