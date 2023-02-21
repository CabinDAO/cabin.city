import { useUser } from '../auth/useUser'
import { Navbar } from '../core/Navbar'

export const ProfileNavbar = () => {
  const { user } = useUser()
  if (!user) return null

  return <Navbar profileId={user._id} avatarUrl={user.avatar?.url} />
}
