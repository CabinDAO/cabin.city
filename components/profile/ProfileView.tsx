import { useRouter } from 'next/router'
import { useUser } from '../auth/useUser'
import { TitleCard } from '../core/TitleCard'
import { Body1 } from '../core/Typography'
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
      <Body1>{user?.name}</Body1>
      <Body1>{user?.email}</Body1>
      <Body1>{user?.account.address}</Body1>
    </SingleColumnLayout>
  )
}
