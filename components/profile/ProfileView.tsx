import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'
import Error404 from '@/pages/404'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ProfileContent } from './view-profile/ProfileContent'
import Head from 'next/head'

export const ProfileView = ({ externId }: { externId: string }) => {
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

  return (
    <>
      <Head>
        <title>{profile.name}'s Cabin Profile</title>
      </Head>
      <BaseLayout>
        <ProfileContent profile={profile} />
      </BaseLayout>
    </>
  )
}
