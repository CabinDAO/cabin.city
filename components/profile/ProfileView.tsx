import Head from 'next/head'
import Error404 from '@/pages/404'
import { useProfile } from '@/components/auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ProfileInnerContainer } from '@/components/profile/profile.styles'
import { ProfileHeaderSection } from '@/components/profile/view-profile/ProfileHeaderSection'
import { ProfileSetupSection } from '@/components/profile/view-profile/ProfileSetupSection'
import { ProfileAboutSection } from '@/components/profile/view-profile/ProfileAboutSection'
import { ProfileCitizenSection } from '@/components/profile/view-profile/ProfileCitizenSection'
import { ProfileStampsSection } from '@/components/profile/view-profile/ProfileStampsSection'
import { ProfileActivitiesSection } from '@/components/profile/view-profile/ProfileActivitiesSection'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { user } = useProfile()

  const { useGet } = useBackend()
  const { data: data, isLoading } = useGet<ProfileGetResponse>(
    externId ? ['PROFILE', { externId }] : null
  )

  const profile = !data || 'error' in data ? null : data.profile

  if (!externId || isLoading) {
    return null
  } else if (!profile) {
    return Error404()
  }

  const isOwnProfile = user?.externId === profile.externId

  return (
    <>
      <Head>
        <title>{profile.name}'s Cabin Profile</title>
      </Head>
      <BaseLayout>
        <ProfileInnerContainer>
          <ProfileHeaderSection profile={profile} />
          {isOwnProfile && (
            <ProfileSetupSection profileId={profile.externId} me={user} />
          )}
          <ProfileAboutSection profile={profile} />
          <ProfileCitizenSection profile={profile} />
          <ProfileStampsSection profile={profile} />
          <ProfileActivitiesSection profile={profile} />
        </ProfileInnerContainer>
      </BaseLayout>
    </>
  )
}
