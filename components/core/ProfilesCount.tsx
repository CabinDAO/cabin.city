import styled from 'styled-components'
import { Avatar } from './Avatar'
import { Caption } from '@/components/core/Typography'

interface ProfileAvatar {
  url: string
}

interface Profile {
  _id: string
  avatar?: ProfileAvatar | null | undefined
}

interface ProfilesCountProps {
  profiles: Profile[]
}

export const ProfilesCount = ({ profiles }: ProfilesCountProps) => {
  const firstThreeProfiles = profiles.slice(0, 3)
  const additionalProfilesCount = profiles.length - 3
  const displayAdditionalProfilesCount = additionalProfilesCount > 0

  return (
    <ProfilesCountContainer>
      {firstThreeProfiles.map((profile) => (
        <AvatarContainer key={profile._id}>
          <Avatar src={profile.avatar?.url} size={2.4} color="yellow300" />
        </AvatarContainer>
      ))}

      {displayAdditionalProfilesCount && (
        <ProfileCount>+{additionalProfilesCount}</ProfileCount>
      )}
    </ProfilesCountContainer>
  )
}

const ProfilesCountContainer = styled.div`
  display: flex;
  flex-flow: row;
  padding-left: 0.8rem;
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
