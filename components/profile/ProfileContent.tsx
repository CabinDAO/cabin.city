import { GetProfileByIdFragment } from '@/generated/graphql'
import { getCountForEvent } from '@/utils/events'
import { useUser } from '../auth/useUser'
import { ProfileProgressCard } from '../core/ProfileProgressCard'
import { ProfileInnerContainer } from './profile.styles'
import { ProfileAboutSection } from './ProfileAboutSection'
import { ProfileHeader } from './ProfileHeader'

interface ProfileContentProps {
  profile: GetProfileByIdFragment
}

export const ProfileContent = ({ profile }: ProfileContentProps) => {
  const { user: myProfile } = useUser()
  const complete = getCountForEvent(myProfile, 'profile_setup_finished')
  const isOwnProfile = myProfile?._id === profile._id

  return (
    <ProfileInnerContainer>
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
      {isOwnProfile && (
        <ProfileProgressCard
          progress={complete ? 100 : 25}
          profileId={profile._id}
        />
      )}
      <ProfileAboutSection profile={profile} />
    </ProfileInnerContainer>
  )
}
