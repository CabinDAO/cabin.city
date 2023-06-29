import { useRouter } from 'next/router'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import {
  ActivityItemFragment,
  useGetProfileByIdQuery,
} from '@/generated/graphql'
import { ProfileContent } from './view-profile/ProfileContent'

interface ProfileViewProps {
  profileId?: string
}

export const ProfileView = ({ profileId }: ProfileViewProps) => {
  const router = useRouter()
  const id = (profileId as string) ?? (router.query.id as string)

  const { data, loading: loadingProfile } = useGetProfileByIdQuery({
    variables: { id },
  })

  const profile = data?.findProfileByID
  const activityItems =
    data?.activitiesByProfile?.data.filter(
      (a): a is ActivityItemFragment => !!a
    ) ?? []

  if (loadingProfile) {
    return null
  } else if (!profile) {
    router.push('/logout')
    return null
  }

  return (
    <SingleColumnLayout>
      <ProfileContent profile={profile} activityItems={activityItems} />
    </SingleColumnLayout>
  )
}
