import { useRouter } from 'next/router'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import {
  ActivityItemFragment,
  useGetProfileByIdQuery,
} from '@/generated/graphql'
import { ProfileContent } from './view-profile/ProfileContent'

export const ProfileView = () => {
  const router = useRouter()
  const { id: profileId } = router.query

  const { data, loading: loadingProfile } = useGetProfileByIdQuery({
    variables: { id: profileId as string },
  })

  const profile = data?.findProfileByID
  const activityItems =
    data?.activitiesByProfile?.data.filter(
      (a): a is ActivityItemFragment => !!a
    ) ?? []

  if (loadingProfile) {
    return null
  } else if (!profile) {
    router.push('/race')
    return null
  }

  return (
    <SingleColumnLayout>
      <ProfileContent profile={profile} activityItems={activityItems} />
    </SingleColumnLayout>
  )
}
