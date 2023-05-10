import { useUser } from '../auth/useUser'
import { Navbar } from '../core/Navbar'

export const ProfileNavbar = () => {
  const { user } = useUser()

  return <Navbar profileId={user?._id} avatarUrl={user?.avatar?.url} />
}
