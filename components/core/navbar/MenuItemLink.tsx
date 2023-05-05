import {
  MenuItemOption,
  MenuItemsAuthenticatedMap,
  MenuItemsUnauthenticatedMap,
} from '@/utils/nav/types'
import IconLink from '../IconLink'
import { Tooltip } from '../Tooltip'

interface MenuItemLinkProps {
  menuItem: MenuItemOption
  profileId?: string
}

export const MenuItemLink = ({ menuItem, profileId }: MenuItemLinkProps) => {
  const menuItemConfig = profileId
    ? MenuItemsAuthenticatedMap[menuItem]
    : MenuItemsUnauthenticatedMap[menuItem]

  if (!menuItemConfig) return null

  return (
    <Tooltip
      tooltip={menuItemConfig.displayText ?? ''}
      position="right"
      animate
    >
      <IconLink
        icon={menuItemConfig.icon}
        size={menuItemConfig.iconSize ?? 2.5}
        color={'green400'}
        href={menuItemConfig.path}
      />
    </Tooltip>
  )
}
