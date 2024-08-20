import { ContentCard } from '@/components/core/ContentCard'
import { ProfileVerifiedCitizenship } from './ProfileVerifiedCitizenship'
import { ProfileFragment, CitizenshipStatus } from '@/utils/types/profile'

export const ProfileCitizenSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  return profile.citizenshipStatus === CitizenshipStatus.Verified ? (
    <ContentCard shape="notch">
      <ProfileVerifiedCitizenship profile={profile} />
    </ContentCard>
  ) : null
}
