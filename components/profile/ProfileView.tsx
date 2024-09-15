import Head from 'next/head'
import Error404 from '@/pages/404'
import { useUser } from '@/components/auth/useUser'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'
import styled from 'styled-components'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ProfileHeaderSection } from '@/components/profile/view-profile/ProfileHeaderSection'
import { ProfileNextStepsSection } from '@/components/profile/view-profile/ProfileNextStepsSection'
import { ProfileAboutSection } from '@/components/profile/view-profile/ProfileAboutSection'
import { ProfileCitizenSection } from '@/components/profile/view-profile/ProfileCitizenSection'
import { ProfileStampsSection } from '@/components/profile/view-profile/ProfileStampsSection'
import { ProfileActivitiesSection } from '@/components/profile/view-profile/ProfileActivitiesSection'
import { CURRENT_CLAIMABLE_STAMP } from '@/utils/types/stamp'
import Link from 'next/link'
import { Body1 } from '@/components/core/Typography'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { user } = useUser()

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
        <Container>
          <ProfileHeaderSection profile={profile} />
          {isOwnProfile && <ProfileNextStepsSection me={user} />}
          {isOwnProfile &&
            CURRENT_CLAIMABLE_STAMP &&
            new Date().toISOString() > '2024-09-22' && (
              <div style={{ textAlign: 'center' }}>
                <Body1>
                  👉{' '}
                  <Link href={'/ns'} style={{ textDecoration: 'underline' }}>
                    don't forget your {CURRENT_CLAIMABLE_STAMP.name} stamp
                  </Link>
                </Body1>
              </div>
            )}
          <ProfileAboutSection profile={profile} me={user} />
          <ProfileStampsSection profile={profile} />
          <ProfileCitizenSection profile={profile} />
          <ProfileActivitiesSection profile={profile} />
        </Container>
      </BaseLayout>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
  }
`
