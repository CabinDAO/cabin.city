import Error from 'next/error'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ProfileContent } from './view-profile/ProfileContent'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { useGet } = useBackend()
  const {
    data: data,
    isLoading,
    mutate: refetchProfile,
  } = useGet<ProfileGetResponse>(externId ? ['PROFILE', { externId }] : null)

  const profile = !data || 'error' in data ? null : data.profile

  if (isLoading) {
    return null
  } else if (!profile) {
    // todo: should we do useEffect() to redirect to /404? look at how this redirect is done elsewhere
    return <Error statusCode={404} />
  }

  return (
    <SingleColumnLayout>
      <ProfileContent profile={profile} refetchProfile={refetchProfile} />
    </SingleColumnLayout>
  )
}
