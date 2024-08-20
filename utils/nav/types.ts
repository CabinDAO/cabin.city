import { IconName } from '@/components/core/Icon'

export type MenuItemOption =
  | 'home'
  | 'neighborhoods'
  | 'members'
  | 'activity'
  | 'profile'
  | 'citizenship'
  | 'signOut'
  | 'signIn'
  | 'admin'

export type MenuItemConfig = {
  icon: IconName
  path: string
  displayText?: string
  iconSize?: number
}

export const MenuItemsAuthenticatedMap: Record<
  MenuItemOption,
  MenuItemConfig | null
> = {
  home: {
    icon: 'logo-cabin',
    path: '/',
    displayText: 'Home',
    iconSize: 3.2,
  },
  neighborhoods: {
    icon: 'map-fold',
    path: '/city-directory',
    displayText: 'City Directory',
    iconSize: 2,
  },
  members: {
    icon: 'members',
    path: '/census',
    displayText: 'Census',
    iconSize: 2.5,
  },
  activity: {
    icon: 'dashboard',
    path: '/activity',
    displayText: 'Activity',
    iconSize: 2.5,
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
  admin: {
    icon: 'person',
    path: '/admin',
    displayText: 'Admin Tools',
  },
  signOut: {
    icon: 'sign-out',
    path: '/logout',
    displayText: 'Sign Out',
  },
  signIn: null,
}

export const MenuItemsUnauthenticatedMap: Record<
  MenuItemOption,
  MenuItemConfig | null
> = {
  home: {
    icon: 'logo-cabin',
    path: '/',
    displayText: 'Home',
    iconSize: 3.2,
  },
  neighborhoods: {
    icon: 'map-fold',
    path: '/city-directory',
    displayText: 'City Directory',
    iconSize: 2,
  },
  members: null,
  activity: null,
  profile: null,
  citizenship: null,
  admin: null,
  signOut: null,
  signIn: {
    icon: 'profile',
    path: '/?signin=true',
    displayText: 'Sign In',
  },
}
