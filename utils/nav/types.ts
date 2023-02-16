import { IconName } from '@/components/core/Icon'

export type MenuItemOption = 'home' | 'members' | 'neighborhoods' | 'profile'
export type MenuItemConfig = {
  icon: IconName
  path: string
  tooltipText?: string
}

export const MenuItemsMap: Record<MenuItemOption, MenuItemConfig> = {
  home: {
    icon: 'logo-cabin',
    path: '/dashboard',
    tooltipText: 'Activity',
  },
  members: {
    icon: 'members',
    path: '/directory',
    tooltipText: 'Census',
  },
  neighborhoods: {
    icon: 'neighborhoods',
    path: '/neighborhoods',
    tooltipText: 'Neighborhoods',
  },
  profile: {
    icon: 'profile',
    path: '/profile',
    tooltipText: 'Profile',
  },
}
