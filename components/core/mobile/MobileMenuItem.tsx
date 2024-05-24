import {
  MenuItemOption,
  MenuItemsAuthenticatedMap,
  MenuItemsUnauthenticatedMap,
} from '@/utils/nav/types'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import Icon from '../Icon'
import { Subline1 } from '../Typography'
import { AuthenticatedLink } from '../AuthenticatedLink'
import analytics from '@/lib/googleAnalytics/analytics'

interface MobileMenuItemProps {
  menuItem: MenuItemOption
  profileId?: string
  authenticated?: boolean
}

export const MobileMenuItem = ({
  menuItem,
  profileId,
  authenticated,
}: MobileMenuItemProps) => {
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

  if (authenticated) {
    return (
      <StyledAuthenticatedLink logSignInEvent={menuItem === 'signIn'}>
        <Icon name={menuItemConfig.icon} size={1.9} color={'green400'} />
        <Subline1 $color="yellow100">{menuItemConfig.displayText}</Subline1>
      </StyledAuthenticatedLink>
    )
  }

  return (
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
