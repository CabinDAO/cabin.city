import { useProfile } from '../auth/useProfile'
import { Navbar } from '../core/Navbar'

export const ProfileNavbar = () => {
  const { user } = useProfile()

  return <Navbar profileId={user?._id} avatarUrl={user?.avatar?.url} />
}
