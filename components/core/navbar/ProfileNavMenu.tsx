import { useProfile } from '@/components/auth/useProfile'
import useEns from '@/components/hooks/useEns'
import { shortenedAddress } from '@/utils/display-utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { Avatar } from '../Avatar'
import { HorizontalDivider } from '../Divider'
import Icon from '../Icon'
import { Caption, Subline1 } from '../Typography'
import analytics from '@/lib/googleAnalytics/analytics'
import { MenuItemOption } from '@/utils/nav/types'
import { CitizenshipStatus } from '@/utils/types/profile'

interface ProfileNavMenuProps {
  visible: boolean
}

const INNER_PADDING = '1.2rem 1.6rem'

export const ProfileNavMenu = ({ visible }: ProfileNavMenuProps) => {
  const { user } = useProfile()

  const { ens } = useEns(user?.walletAddress)
  const displayCaption = ens ?? shortenedAddress(user?.walletAddress)

  if (!user) {
    return null
  }

  const handleClick = (menuItemOption: MenuItemOption) => {
    analytics.navBarEvent(menuItemOption)
  }

  return (
    <Container
      initial={{
        transform: 'translateX(4.8rem)',
        opacity: 0,
        pointerEvents: 'none',
      }}
      animate={{
        transform: visible ? 'translateX(0%)' : 'translateX(4.8rem)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transition: {
          duration: 0.2,
        },
      }}
    >
      <ProfileLink
        onClick={() => handleClick('profile')}
        href={`/profile/${user.externId}`}
      >
        <Avatar size={2.4} src={user.avatarUrl} />
        <Name>
          <Subline1 $color="yellow100">{user.name}</Subline1>
          <Caption $color="yellow100">{displayCaption}</Caption>
        </Name>
      </ProfileLink>
      <HorizontalDivider opaque />
      <ProfileMenuItemsContainer>
        <ProfileMenuItem
          onClick={() => handleClick('citizenship')}
          href="/citizenship"
        >
          <Icon name="citizen" size={2} color="green400" />
          <Subline1 $color="yellow100">Citizenship</Subline1>
        </ProfileMenuItem>
        {user.isAdmin && (
          <ProfileMenuItem onClick={() => handleClick('admin')} href="/admin">
            <Icon name="person" size={2} color="green400" />
            <Subline1 $color="yellow100">Admin Tools</Subline1>
          </ProfileMenuItem>
        )}
        <ProfileMenuItem onClick={() => handleClick('signOut')} href="/logout">
          <Icon name="sign-out" size={2} color="green400" />
          <Subline1 $color="yellow100">Sign out</Subline1>
        </ProfileMenuItem>
      </ProfileMenuItemsContainer>
    </Container>
  )
}

const Container = styled(motion.div)`
  user-select: none;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.green800};
  border-radius: 8px 0px;
  border-width: 0.5px 2px 2px 0.5px;
  border-style: solid;
  width: 23.2rem;
  left: 10rem;
  top: 25rem;

  ${({ theme }) => theme.bp.lg} {
    left: 7.8rem;
    top: 83%;
  }
`

const menuLinkStyles = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${INNER_PADDING};
  width: 100%;

  &:hover {
    background-color: rgb(70, 89, 82);
  }
`

const ProfileLink = styled(Link)`
  ${menuLinkStyles}
  gap: 1.6rem;
  padding-bottom: 1.2rem;
`

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.1rem;
`

const ProfileMenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const ProfileMenuItem = styled(Link)`
  ${menuLinkStyles}
  gap: 1.8rem;
`
