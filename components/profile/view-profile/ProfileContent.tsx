import { useProfile } from '../../auth/useProfile'
import { ProfileSetupSection } from './ProfileSetupSection'
import { ProfileInnerContainer } from '../profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeaderSection } from './ProfileHeaderSection'
import { ProfileStampsSection } from './ProfileStampsSection'
import { ProfileActivitiesSection } from './ProfileActivitiesSection'
import { ProfileCitizenSection } from './ProfileCitizenSection'
import { ProfileFragment } from '@/utils/types/profile'

export const ProfileContent = ({
  profile,
  refetchProfile,
}: {
  profile: ProfileFragment
  refetchProfile: VoidFunction
}) => {
  const { user: me } = useProfile()

  const isOwnProfile = me?.externId === profile.externId

  return (
    <ProfileInnerContainer>
      <ProfileHeaderSection profile={profile} refetchProfile={refetchProfile} />
      {isOwnProfile && (
        <ProfileSetupSection profileId={profile.externId} me={me} />
      )}
      <ProfileAboutSection profile={profile} />
      <ProfileCitizenSection isOwnProfile={isOwnProfile} profile={profile} />
      <ProfileStampsSection profile={profile} />
      <ProfileActivitiesSection profile={profile} />
    </ProfileInnerContainer>
  )
}
