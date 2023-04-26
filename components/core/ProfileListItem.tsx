import { ProfileFragment } from '@/generated/graphql'
import { truncate } from '@/utils/display-utils'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import styled from 'styled-components'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Body2, Caption, H4 } from './Typography'
import { ListItem } from './ListItem'

interface ProfileListItemProps {
  profile: ProfileFragment
}

export const ProfileListItem = (props: ProfileListItemProps) => {
  const { profile } = props
  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.role)
  )
  const { deviceSize } = useDeviceSize()
  const avatarSize = deviceSize === 'mobile' ? 4 : 6.4

  return (
    <ListItem href={`/profile/${profile._id}`}>
      <AvatarContainer>
        <Avatar src={profile.avatar?.url} size={avatarSize} />
        <InfoContainer>
          <NameContainer>
            <H4>{profile.name}</H4>
            <ProfileIcons
              citizenshipStatus={profile.citizenshipStatus}
              roleInfos={roleInfos}
            />
          </NameContainer>
          <Caption>
            {profile.cabinTokenBalanceInt ?? 0} ₡ABIN &nbsp;·&nbsp;{' '}
            {profile.badgeCount} stamps
          </Caption>
          <StyledBody2>{truncate(profile.bio ?? '', 90)}</StyledBody2>
        </InfoContainer>
      </AvatarContainer>
      <CaptionContainer>
        <Caption>
          Joined {format(parseISO(profile.createdAt), 'MMM yyyy')}
        </Caption>
      </CaptionContainer>
    </ListItem>
  )
}

const CaptionContainer = styled.div`
  padding-left: 5.4rem;
  padding-top: 0.4rem;

  ${({ theme }) => theme.bp.md} {
    padding: 0;
  }
`

const AvatarContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const NameContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`

const StyledBody2 = styled(Body2)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 25rem;
  overflow: ellipsis;

  ${({ theme }) => theme.bp.md} {
    max-width: 40rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 55rem;
  }
`
