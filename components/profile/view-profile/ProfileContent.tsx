import { GetProfileByIdFragment } from '@/generated/graphql'
import { getCountForEvent } from '@/utils/events'
import { useUser } from '../../auth/useUser'
import { ProfileProgressCardSection } from './ProfileProgressCardSection'
import { ProfileInnerContainer } from '../profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeaderSection } from './ProfileHeaderSection'
import { ProfileRolesSection } from './ProfileRolesSection'

interface ProfileContentProps {
  profile: GetProfileByIdFragment
}

export const ProfileContent = ({ profile }: ProfileContentProps) => {
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
    </ProfileInnerContainer>
  )
}
