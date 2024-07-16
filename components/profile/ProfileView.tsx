import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'
import Error404 from '@/pages/404'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ProfileContent } from './view-profile/ProfileContent'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { useGet } = useBackend()
  const {
    data: data,
    isLoading,
    mutate: refetchProfile,
  } = useGet<ProfileGetResponse>(externId ? ['PROFILE', { externId }] : null)

  const profile = !data || 'error' in data ? null : data.profile

  if (!externId || isLoading) {
    return null
  } else if (!profile) {
    return Error404()
  }

  return (
    <BaseLayout>
      <ProfileContent profile={profile} refetchProfile={refetchProfile} />
    </BaseLayout>
  )
}
