import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { useModal } from '@/components/hooks/useModal'
import useEns from '@/components/hooks/useEns'
import {
  MenuItemOption,
  MenuItemsAuthenticatedMap,
  MenuItemsUnauthenticatedMap,
} from '@/utils/nav/types'
import { CitizenshipStatus } from '@/utils/types/profile'
import analytics from '@/lib/googleAnalytics/analytics'
import { shortenedAddress } from '@/utils/display-utils'
import styled, { css } from 'styled-components'
import Icon from '@/components/core/Icon'
import ClickAway from '@/components/core/ClickAway'
import { HorizontalDivider } from '@/components/core/Divider'
import { Avatar } from '@/components/core/Avatar'
import { Caption, Subline1 } from '@/components/core/Typography'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

export const NavbarMobile = () => {
  const { user } = useProfile()

  const { active } = useModal()
  useEffect(() => {
    if (active) setOpen(false)
  }, [active])

  const [open, setOpen] = useState(false)
  const [lastToggle, setLastToggle] = useState(new Date())

  const toggleOpen = (clickAway: boolean) => {
    if (
      (clickAway && !open) || // clickaway is triggered even if the menu is closed
      lastToggle.getTime() + 100 > new Date().getTime() // clickaway is also triggered when you click the button
    ) {
      return
    }
    setLastToggle(new Date())
    setOpen(clickAway ? false : !open)
  }

  return (
    <>
      <ClickAway
        onClickAway={() => {
          toggleOpen(true)
        }}
      >
        <MobileNavContainer open={open}>
          <InnerContainer>
            <MobileMenuItem menuItem={'home'} profileId={user?.externId} />
            <MobileMenuItem
              menuItem={'neighborhoods'}
              profileId={user?.externId}
            />
            <MobileMenuItem menuItem={'members'} profileId={user?.externId} />
            <MobileMenuItem menuItem={'activity'} profileId={user?.externId} />
            <StyledDivider />
            <MobileMenuProfileItem />
            <MobileMenuItem
              menuItem={'citizenship'}
              profileId={user?.externId}
            />
            {user && user.isAdmin && (
              <MobileMenuItem menuItem={'admin'} profileId={user?.externId} />
            )}
            <MobileMenuItem menuItem={'signOut'} profileId={user?.externId} />
            <MobileMenuItem
              authenticated
              menuItem={'signIn'}
              profileId={user?.externId}
            />
          </InnerContainer>
        </MobileNavContainer>

        <FloatingMenuContainer onClick={() => toggleOpen(false)}>
          <Icon name={open ? 'close' : 'menu'} size={2} color={'green400'} />
          {/*<Notch notchSize={1} />*/}
        </FloatingMenuContainer>
      </ClickAway>
    </>
  )
}

const MobileNavContainer = styled.div<{ open: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  height: 100vw;
  width: 80vw;
  background-color: ${({ theme }) => theme.colors.green800};
  height: 100%;
  box-shadow: 8px 8px 0px ${({ theme }) => theme.colors.green900};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-110%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 2;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 3rem;
  align-items: center;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`

const StyledDivider = styled(HorizontalDivider)`
  opacity: 1;
  width: 100%;
`

const FloatingMenuContainer = styled.nav`
  position: fixed;
  z-index: 2;
  cursor: pointer;
  padding: 1.6rem;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.green800};
  justify-content: center;
  align-items: center;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-bottom-left-radius: 2rem;
  box-shadow: -0.4rem 0.4rem 0rem ${({ theme }) => theme.colors.yellow900};
`

const Notch = styled.div<{ notchSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.notchSize}rem;
  height: ${(props) => props.notchSize}rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
`

const MobileMenuProfileItem = () => {
  const { user } = useProfile()
  const { ens } = useEns(user?.walletAddress)
  const displayCaption = ens ?? shortenedAddress(user?.walletAddress)

  if (!user) return null

  return (
    <ProfileLink href={`/profile/${user.externId}`}>
      <Avatar size={2.4} src={user.avatarUrl} />
      <ProfileNameContainer>
        <Subline1 $color="yellow100">{user.name}</Subline1>
        {displayCaption && (
          <Caption $color="yellow100">{displayCaption}</Caption>
        )}
      </ProfileNameContainer>
    </ProfileLink>
  )
}

const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  justify-content: center;
`

export const ProfileLink = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`

const MobileMenuItem = ({
  menuItem,
  profileId,
  authenticated,
}: {
  menuItem: MenuItemOption
  profileId?: string
  authenticated?: boolean
}) => {
  const menuItemConfig = profileId
    ? MenuItemsAuthenticatedMap[menuItem]
    : MenuItemsUnauthenticatedMap[menuItem]

  const handleClick = () => {
    analytics.navBarEvent(menuItem)

    if (menuItem === 'signIn') {
      analytics.signInEvent()
    }
  }

  if (!menuItemConfig) return null

  return authenticated ? (
    <StyledAuthenticatedLink logSignInEvent={menuItem === 'signIn'}>
      <Icon name={menuItemConfig.icon} size={1.9} color={'green400'} />
      <Subline1 $color="yellow100">{menuItemConfig.displayText}</Subline1>
    </StyledAuthenticatedLink>
  ) : (
    <StyledLink onClick={handleClick} href={menuItemConfig.path}>
      <Icon name={menuItemConfig.icon} size={1.9} color={'green400'} />
      <Subline1 $color="yellow100">{menuItemConfig.displayText}</Subline1>
    </StyledLink>
  )
}

const linkStyles = css`
  display: flex;
  flex-direction: row;
  gap: 1.84rem;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`

const StyledLink = styled(Link)`
  ${linkStyles}
`

const StyledAuthenticatedLink = styled(AuthenticatedLink)`
  ${linkStyles}
`
