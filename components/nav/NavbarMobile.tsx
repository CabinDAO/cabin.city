import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import { MenuItemName, MenuItems } from '@/components/nav/types'
import analytics from '@/lib/googleAnalytics/analytics'
import styled, { css } from 'styled-components'
import Icon from '@/components/core/Icon'
import ClickAway from '@/components/core/ClickAway'
import { HorizontalDivider } from '@/components/core/Divider'
import { Avatar } from '@/components/profile/Avatar'
import { Subline1 } from '@/components/core/Typography'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { MeFragment } from '@/utils/types/profile'

export const NavbarMobile = () => {
  const { user } = useUser()

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
            <MobileMenuItem menuItem={'home'} user={user} />
            <MobileMenuItem menuItem={'accelerator'} user={user} />
            <MobileMenuItem menuItem={'neighborhoods'} user={user} />
            <MobileMenuItem menuItem={'census'} user={user} />
            <StyledDivider />
            <MobileMenuItem menuItem={'profile'} user={user} />
            <MobileMenuItem menuItem={'signOut'} user={user} />
            <MobileMenuItem menuItem={'signIn'} user={user} />
            {user && user.isAdmin && (
              <MobileMenuItem menuItem={'admin'} user={user} />
            )}
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
  height: 100vh;
  //height: 100%;
  width: 80vw;
  background-color: ${({ theme }) => theme.colors.green800};
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

const MobileMenuItem = ({
  menuItem,
  user,
}: {
  menuItem: MenuItemName
  user: MeFragment | null
}) => {
  const item = MenuItems[menuItem]

  const handleClick = () => {
    analytics.navBarEvent(menuItem)

    if (menuItem === 'signIn') {
      analytics.signInEvent()
    }
  }

  const visible =
    item.visibility === 'always' ||
    (user && item.visibility === 'authOnly') ||
    (!user && item.visibility === 'unauthOnly')

  if (!visible) return null

  return menuItem === 'signIn' ? (
    <StyledAuthenticatedLink logSignInEvent>
      <Icon name={item.icon} size={1.9} color={'green400'} />
      <Subline1 $color="yellow100">{item.displayText}</Subline1>
    </StyledAuthenticatedLink>
  ) : (
    <StyledLink onClick={handleClick} href={item.path}>
      {user && menuItem == 'profile' ? (
        <>
          <Avatar src={user} size={2.4} />
          <Subline1 $color="yellow100">{user.name}</Subline1>
        </>
      ) : (
        <>
          <Icon name={item.icon} size={1.9} color={'green400'} />
          <Subline1 $color="yellow100">{item.displayText}</Subline1>
        </>
      )}
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
