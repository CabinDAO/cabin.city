import {
  ActivityItemFragment,
  GetProfileByIdFragment,
} from '@/generated/graphql'
import { useProfile } from '../../auth/useProfile'
import { ProfileSetupSection } from './ProfileSetupSection'
import { ProfileInnerContainer } from '../profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeaderSection } from './ProfileHeaderSection'
import { ProfileRolesSection } from './ProfileRolesSection'
import { ProfilePassportsSection } from './ProfilePassportsSection'
import { ProfileActivitiesSection } from './ProfileActivitiesSection'
import { ProfileCitizenSection } from './ProfileCitizenSection'

interface ProfileContentProps {
  profile: GetProfileByIdFragment
  activityItems: ActivityItemFragment[]
}

export const ProfileContent = ({
  profile,
  activityItems,
}: ProfileContentProps) => {
  const { user: me } = useProfile()
  if (!me) return null

  const isOwnProfile = me?._id === profile._id

  return (
    <ProfileInnerContainer>
      <ProfileHeaderSection profile={profile} isOwnProfile={isOwnProfile} />
      {isOwnProfile && <ProfileSetupSection profileId={profile._id} me={me} />}
      <ProfileAboutSection profile={profile} />
      <ProfileCitizenSection isOwnProfile={isOwnProfile} profile={profile} />
      <ProfileRolesSection profile={profile} />
      <ProfilePassportsSection profile={profile} />
      <ProfileActivitiesSection activityItems={activityItems} />
    </ProfileInnerContainer>
  )
}
