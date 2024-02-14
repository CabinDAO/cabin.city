import { useProfile } from '../../auth/useProfile'
import { ProfileSetupSection } from './ProfileSetupSection'
import { ProfileInnerContainer } from '../profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeaderSection } from './ProfileHeaderSection'
import { ProfileRolesSection } from './ProfileRolesSection'
import { ProfilePassportsSection } from './ProfilePassportsSection'
import { ProfileActivitiesSection } from './ProfileActivitiesSection'
import { ProfileCitizenSection } from './ProfileCitizenSection'
import { ProfileFragment } from '@/utils/types/profile'

export const ProfileContent = ({ profile }: { profile: ProfileFragment }) => {
  const { user: me } = useProfile()
  if (!me) return null

  const isOwnProfile = me?.externId === profile.externId

  return (
    <ProfileInnerContainer>
      <ProfileHeaderSection profile={profile} isOwnProfile={isOwnProfile} />
      {isOwnProfile && (
        <ProfileSetupSection profileId={profile.externId} me={me} />
      )}
      <ProfileAboutSection profile={profile} />
      <ProfileCitizenSection isOwnProfile={isOwnProfile} profile={profile} />
      <ProfileRolesSection profile={profile} />
      <ProfilePassportsSection profile={profile} />
      <ProfileActivitiesSection profile={profile} />
    </ProfileInnerContainer>
  )
}
