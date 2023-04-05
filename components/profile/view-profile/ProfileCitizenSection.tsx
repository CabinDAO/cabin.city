import { ContentCard } from '@/components/core/ContentCard'
import { CitizenshipStatus, GetProfileByIdFragment } from '@/generated/graphql'
import { ProfileUnverifiedCitizenship } from './ProfileUnverifiedCitizenship'
import { ProfileVerifiedCitizenship } from './ProfileVerifiedCitizenship'

interface ProfileCitizenSectionProps {
  profile: GetProfileByIdFragment
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
