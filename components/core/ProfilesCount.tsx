import { RecentVoterFragment } from '@/utils/types/location'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { Caption } from '@/components/core/Typography'

interface ProfilesCountProps {
  profiles: RecentVoterFragment[]
}

export const ProfilesCount = ({ profiles }: ProfilesCountProps) => {
  const topProfiles = profiles.slice(0, 3)
  const additionalProfilesCount = profiles.length - 3
  const displayAdditionalProfilesCount = additionalProfilesCount > 0

  return (
    <ProfilesCountContainer>
      {topProfiles.map((profile) => (
        <AvatarContainer key={profile.externId}>
          <Avatar src={profile.avatar.url} size={2.4} color="yellow300" />
        </AvatarContainer>
      ))}

      {displayAdditionalProfilesCount && (
        <ProfileCount>+{additionalProfilesCount}</ProfileCount>
      )}

      {topProfiles.length === 0 && <ProfileCount>-</ProfileCount>}
    </ProfilesCountContainer>
  )
}

const ProfilesCountContainer = styled.div`
  display: flex;
  flex-flow: row;
  padding-left: 0.8rem;
  align-items: center;
  justify-content: flex-end;
`

const AvatarContainer = styled.div`
  margin-left: -0.8rem;
`

const ProfileCount = styled(Caption)`
  padding: 0.3rem 0.6rem 0.3rem 0.4rem;
  margin-left: -0.8rem;
  background: ${({ theme }) => theme.colors.yellow300};
  border-radius: 2.4rem;
  opacity: 1;
  align-items: center;
  display: flex;
`
