import { IconName } from '@/components/core/Icon'

type visibility = 'always' | 'authOnly' | 'unauthOnly'

export type MenuItemName =
  | 'home'
  | 'neighborhoods'
  | 'members'
  | 'profile'
  | 'signOut'
  | 'signIn'
  | 'admin'

type Config = {
  icon: IconName
  path: string
  visibility: visibility
  displayText?: string
  iconSize?: number
}

export const MenuItems: Record<MenuItemName, Config> = {
  home: {
    icon: 'logo-cabin',
    path: '/',
    displayText: 'Home',
    iconSize: 3.2,
    visibility: 'always',
  },
  neighborhoods: {
    icon: 'map-fold',
    path: '/city-directory',
    displayText: 'City Directory',
    iconSize: 2,
    visibility: 'always',
  },
  members: {
    icon: 'members',
    path: '/census',
    displayText: 'Census',
    iconSize: 2.5,
    visibility: 'always',
  },
  profile: {
    icon: 'profile',
    path: '/profile',
    displayText: 'Profile',
    iconSize: 3.2,
    visibility: 'authOnly',
  },
  admin: {
    icon: 'peace-sign',
    path: '/admin',
    displayText: 'Admin Tools',
    visibility: 'authOnly',
  },
  signOut: {
    icon: 'sign-out',
    path: '/logout',
    displayText: 'Sign Out',
    visibility: 'authOnly',
    iconSize: 2,
  },
  signIn: {
    icon: 'profile',
    path: '/?signin=true',
    displayText: 'Sign In',
    visibility: 'unauthOnly',
  },
}
