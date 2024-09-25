import { truncate } from '@/utils/display-utils'
import { format } from 'date-fns'
import styled from 'styled-components'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { Avatar } from '@/components/profile/Avatar'
import { Body2, Caption, H4 } from './Typography'
import { ListItem } from './ListItem'
import { ProfileListFragment } from '@/utils/types/profile'

interface ProfileListItemProps {
  profile: ProfileListFragment
}

export const ProfileListItem = (props: ProfileListItemProps) => {
  const { profile } = props
  const { deviceSize } = useDeviceSize()
  const avatarSize = deviceSize === 'mobile' ? 4 : 6.4

  return (
    <StyledListItem href={`/profile/${profile.externId}`}>
      <AvatarContainer>
        <Avatar srcCfId={profile.avatarCfId} size={avatarSize} />
        <InfoContainer>
          <NameContainer>
            <H4>{profile.name}</H4>
          </NameContainer>
          <Caption>
            {profile.cabinTokenBalanceInt !== null && (
              <>{profile.cabinTokenBalanceInt} ₡ABIN &nbsp;·&nbsp; </>
            )}
            {profile.stampCount} stamps
          </Caption>
          <StyledBody2>{truncate(profile.bio ?? '', 90)}</StyledBody2>
        </InfoContainer>
      </AvatarContainer>
      <CaptionContainer>
        <Caption>
          Joined {format(new Date(profile.createdAt), 'MMM yyyy')}
        </Caption>
      </CaptionContainer>
    </StyledListItem>
  )
}

const StyledListItem = styled(ListItem)`
  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

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
