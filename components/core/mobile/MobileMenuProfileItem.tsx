import { useProfile } from '@/components/auth/useProfile'
import useEns from '@/components/hooks/useEns'
import { shortenedAddress } from '@/utils/display-utils'
import Link from 'next/link'
import styled from 'styled-components'
import { Avatar } from '../Avatar'
import { Caption, Subline1 } from '../Typography'

export const MobileMenuProfileItem = () => {
  const { user: profile } = useProfile()
  const { ens } = useEns(profile?.walletAddress)
  const displayCaption = ens ?? shortenedAddress(profile?.walletAddress)

  if (!profile) return null

  return (
    <StyledLink href={`/profile/${profile?.externId}`}>
      <Avatar size={2.4} src={profile?.avatar?.url} />
      <ProfileNameContainer>
        <Subline1 $color="yellow100">{profile?.name}</Subline1>
        {displayCaption && (
          <Caption $color="yellow100">{displayCaption}</Caption>
        )}
      </ProfileNameContainer>
    </StyledLink>
  )
}

const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  justify-content: center;
`

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`
