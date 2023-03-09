import { ProfileFragment } from '@/generated/graphql'
import { formatCabinTokenString } from '@/lib/cabin-token'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Body2, Caption, H4 } from './Typography'

interface ProfileListItemProps {
  profile: ProfileFragment
}

export const ProfileListItem = (props: ProfileListItemProps) => {
  const { profile } = props
  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.role)
  )

  return (
    <ContainerLink href={`/profile/${profile._id}`}>
      <AvatarContainer>
        <Avatar src={profile.avatar?.url} size={6.4} />
        <InfoContainer>
          <NameContainer>
            <H4>{profile.name}</H4>
            <ProfileIcons
              citizenshipStatus={profile.citizenshipStatus}
              roleInfos={roleInfos}
            />
          </NameContainer>
          <Caption>{profile.cabinTokenBalanceInt ?? 0} ₡ABIN</Caption>
          <Body2>{profile.bio}</Body2>
        </InfoContainer>
      </AvatarContainer>
      <div>
        <Caption>
          Joined {format(parseISO(profile.createdAt), 'MMM yyyy')}
        </Caption>
      </div>
    </ContainerLink>
  )
}

const ContainerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:first-child) {
    padding-top: 1.6rem;
  }

  &:not(:last-child) {
    border-bottom: ${(props) => props.theme.border.light};
    padding-bottom: 1.8rem;
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
