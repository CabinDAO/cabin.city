import { ContentCard } from '@/components/core/ContentCard'
import { ProfileUnverifiedCitizenship } from './ProfileUnverifiedCitizenship'
import { ProfileVerifiedCitizenship } from './ProfileVerifiedCitizenship'
import { ProfileFragment, CitizenshipStatus } from '@/utils/types/profile'

interface ProfileCitizenSectionProps {
  profile: ProfileFragment
  isOwnProfile: boolean
}

export const ProfileCitizenSection = ({
  profile,
  isOwnProfile,
}: ProfileCitizenSectionProps) => {
  if (
    !isOwnProfile &&
    profile.citizenshipStatus !== CitizenshipStatus.Verified
  ) {
    return null
  }

  return (
    <ContentCard shape="notch">
      {profile.citizenshipStatus === CitizenshipStatus.Verified ? (
        <ProfileVerifiedCitizenship profile={profile} />
      ) : (
        <ProfileUnverifiedCitizenship profile={profile} />
      )}
    </ContentCard>
  )
}
