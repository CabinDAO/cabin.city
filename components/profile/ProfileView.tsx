import Error from 'next/error'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ProfileContent } from './view-profile/ProfileContent'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { useGet } = useBackend()
  const { data: profileData, isLoading } = useGet<ProfileGetResponse>(
    externId ? ['PROFILE', { externId }] : null
  )

  const profile = profileData?.profile

  if (isLoading) {
    return null
  } else if (!profile) {
    // todo: should we do useEffect() to redirect to /404? look at how this redirect is done elsewhere
    return <Error statusCode={404} />
  }

  return (
    <SingleColumnLayout withFooter>
      <ProfileContent profile={profile} />
    </SingleColumnLayout>
  )
}
