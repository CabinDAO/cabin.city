import { useRouter } from 'next/router'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetProfileByIdQuery } from '@/generated/graphql'
import { ProfileContent } from './view-profile/ProfileContent'

export const ProfileView = () => {
  const router = useRouter()
  const { id: profileId } = router.query

  const { data, loading: loadingProfile } = useGetProfileByIdQuery({
    variables: { id: profileId as string },
  })

  const profile = data?.findProfileByID

  if (loadingProfile) {
    return null
  } else if (!profile) {
    router.push('/race')
    return null
  }

  return (
    <SingleColumnLayout>
      <ProfileContent profile={profile} />
    </SingleColumnLayout>
  )
}
