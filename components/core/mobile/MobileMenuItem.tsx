import {
  MenuItemOption,
  MenuItemsAuthenticatedMap,
  MenuItemsUnauthenticatedMap,
} from '@/utils/nav/types'
import Link from 'next/link'
import styled from 'styled-components'
import Icon from '../Icon'
import { Subline1 } from '../Typography'

interface MobileMenuItemProps {
  menuItem: MenuItemOption
  profileId?: string
}

export const MobileMenuItem = ({
  menuItem,
  profileId,
}: MobileMenuItemProps) => {
  const menuItemConfig = profileId
    ? MenuItemsAuthenticatedMap[menuItem]
    : MenuItemsUnauthenticatedMap[menuItem]

  if (!menuItemConfig) return null

  return (
    <StyledLink href={menuItemConfig.path}>
      <Icon name={menuItemConfig.icon} size={1.9} color={'green400'} />
      <Subline1 $color="yellow100">{menuItemConfig.displayText}</Subline1>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 1.84rem;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`
