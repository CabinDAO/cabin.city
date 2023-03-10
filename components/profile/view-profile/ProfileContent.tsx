import { ActivityFragment, GetProfileByIdFragment } from '@/generated/graphql'
import { getCountForEvent } from '@/utils/events'
import { useUser } from '../../auth/useUser'
import { ProfileProgressCardSection } from './ProfileProgressCardSection'
import { ProfileInnerContainer } from '../profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeaderSection } from './ProfileHeaderSection'
import { ProfileRolesSection } from './ProfileRolesSection'
import { ProfilePassportsSection } from './ProfilePassportsSection'
import { ProfileActivitiesSection } from './ProfileActivitiesSection'

interface ProfileContentProps {
  profile: GetProfileByIdFragment
  activities: (ActivityFragment | null)[] | undefined
}

export const ProfileContent = ({
  profile,
  activities,
}: ProfileContentProps) => {
  const { user: myProfile } = useUser()
  const complete = getCountForEvent(myProfile, 'profile_setup_finished')
  const isOwnProfile = myProfile?._id === profile._id

  return (
    <ProfileInnerContainer>
      <ProfileHeaderSection profile={profile} isOwnProfile={isOwnProfile} />
      {isOwnProfile && (
        <ProfileProgressCardSection
          progress={complete ? 100 : 25}
          profileId={profile._id}
        />
      )}
      <ProfileAboutSection profile={profile} />
      <ProfileRolesSection profile={profile} />
      <ProfilePassportsSection profile={profile} />
      <ProfileActivitiesSection activities={activities} />
    </ProfileInnerContainer>
  )
}
