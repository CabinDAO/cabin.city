import { useRouter } from 'next/router'
import { useUser } from '../auth/useUser'
import { TitleCard } from '../core/TitleCard'
import { Body } from '../core/Typography'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'

export const ProfileView = ({}) => {
  const router = useRouter()
  const { user } = useUser()
  const { id: profileId } = router.query

  if (!profileId) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard title={`Profile #${profileId} is coming`} icon="profile" />
      <Body>{user?.name}</Body>
      <Body>{user?.email}</Body>
      <Body>{user?.account.address}</Body>
    </SingleColumnLayout>
  )
}
