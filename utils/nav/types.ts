import { IconName } from '@/components/core/Icon'

export type MenuItemOption =
  | 'home'
  | 'members'
  | 'neighborhoods'
  | 'profile'
  | 'citizenship'
  | 'signOut'
export type MenuItemConfig = {
  icon: IconName
  path: string
  displayText?: string
  iconSize?: number
}

export const MenuItemsMap: Record<MenuItemOption, MenuItemConfig> = {
  home: {
    icon: 'logo-cabin',
    path: '/dashboard',
    displayText: 'Activity',
    iconSize: 3.2,
  },
  members: {
    icon: 'members',
    path: '/directory',
    displayText: 'Census',
    iconSize: 2.5,
  },
  neighborhoods: {
    icon: 'neighborhoods',
    path: '/city-directory',
    displayText: 'City Directory',
    iconSize: 2,
  },
  profile: {
    icon: 'profile',
    path: '/profile',
    displayText: 'Profile',
    iconSize: 3.2,
  },
  citizenship: {
    icon: 'citizen',
    path: '/citizenship',
    displayText: 'Citizenship',
  },
  signOut: {
    icon: 'sign-out',
    path: '/logout',
    displayText: 'Sign Out',
  },
}
