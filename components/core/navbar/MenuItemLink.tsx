import { MenuItemOption, MenuItemsMap } from '@/utils/nav/types'
import IconLink from '../IconLink'
import { Tooltip } from '../Tooltip'

interface MenuItemLinkProps {
  menuItem: MenuItemOption
}

export const MenuItemLink = ({ menuItem }: MenuItemLinkProps) => {
  const menuItemConfig = MenuItemsMap[menuItem]

  return (
    <Tooltip
      tooltip={menuItemConfig.displayText ?? ''}
      position="right"
      animate
    >
      <IconLink
        icon={menuItemConfig.icon}
        size={3.2}
        color={'green400'}
        href={menuItemConfig.path}
      />
    </Tooltip>
  )
}
