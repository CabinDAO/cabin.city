import { useRouter } from 'next/router'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'

export const ProfileView = ({}) => {
  const router = useRouter()
  const { id: profileId } = router.query

  if (!profileId) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard title={`Profile #${profileId} is coming`} icon="profile" />
    </SingleColumnLayout>
  )
}
