import Link from 'next/link'
import Error404 from '@/pages/404'
import { useLocalStorage } from 'react-use'
import { AppHead } from '@/components/head'
import { useUser } from '@/components/auth/useUser'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileGetResponse } from '@/utils/types/profile'
import { cloudflareImageUrl } from '@/lib/image'
import { expandRoute } from '@/utils/routing'
import { CURRENT_CLAIMABLE_STAMP } from '@/utils/types/stamp'
import { STAMP_REMINDER_KEY } from '@/components/profile/StampClaimView'
import styled from 'styled-components'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1 } from '@/components/core/Typography'
import { ProfileHeaderSection } from '@/components/profile/view-profile/ProfileHeaderSection'
import { ProfileNextStepsSection } from '@/components/profile/view-profile/ProfileNextStepsSection'
import { ProfileAboutSection } from '@/components/profile/view-profile/ProfileAboutSection'
import { ProfileCitizenSection } from '@/components/profile/view-profile/ProfileCitizenSection'
import { ProfileStampsSection } from '@/components/profile/view-profile/ProfileStampsSection'
import { ProfileActivitiesSection } from '@/components/profile/view-profile/ProfileActivitiesSection'
import { ProfileNeighborhoodSection } from '@/components/profile/view-profile/ProfileNeighborhoodSection'

export const ProfileView = ({ externId }: { externId: string }) => {
  const { user } = useUser()
  const [hasStampReminder] = useLocalStorage<boolean>(STAMP_REMINDER_KEY)

  const { useGet } = useBackend()
  const { data: data, isLoading } = useGet<ProfileGetResponse>(
    externId ? ['api_profile_externId', { externId }] : null
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
      <AppHead
        title={`${profile.name}'s Cabin Profile`}
        imageUrl={
          profile.avatarCfId
            ? cloudflareImageUrl(profile.avatarCfId)
            : undefined
        }
        pathname={expandRoute(['profile_id', { id: profile.externId }])}
        ogType="person"
      />
      <BaseLayout>
        <Container>
          <ProfileHeaderSection profile={profile} />
          {isOwnProfile && CURRENT_CLAIMABLE_STAMP && hasStampReminder && (
            <div style={{ textAlign: 'center' }}>
              <Body1>
                👉{' '}
                <Link href={'/ns'} style={{ textDecoration: 'underline' }}>
                  don't forget your {CURRENT_CLAIMABLE_STAMP.name} stamp
                </Link>
              </Body1>
            </div>
          )}
          {isOwnProfile && <ProfileNextStepsSection me={user} />}
          <ProfileAboutSection profile={profile} user={user} />
          <ProfileNeighborhoodSection profile={profile} user={user} />
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
