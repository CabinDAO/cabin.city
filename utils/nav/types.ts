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
}

export const MenuItemsMap: Record<MenuItemOption, MenuItemConfig> = {
  home: {
    icon: 'logo-cabin',
    path: '/dashboard',
    displayText: 'Activity',
  },
  members: {
    icon: 'members',
    path: '/directory',
    displayText: 'Census',
  },
  neighborhoods: {
    icon: 'neighborhoods',
    path: '/city-directory',
    displayText: 'City Directory',
  },
  profile: {
    icon: 'profile',
    path: '/profile',
    displayText: 'Profile',
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
