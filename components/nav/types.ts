import { expandRoute } from '@/utils/routing'
import { IconName } from '@/components/core/Icon'

type visibility = 'always' | 'authOnly' | 'unauthOnly'

export type MenuItemName =
  | 'home'
  | 'accelerator'
  | 'neighborhoods'
  | 'census'
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
    path: expandRoute('home'),
    displayText: 'Home',
    iconSize: 3.2,
    visibility: 'always',
  },
  accelerator: {
    icon: 'neighborhood',
    path: expandRoute('accelerator'),
    displayText: 'Accelerator',
    iconSize: 2.5,
    visibility: 'always',
  },
  neighborhoods: {
    icon: 'map-fold',
    path: expandRoute('cityDirectory'),
    displayText: 'City Directory',
    iconSize: 2,
    visibility: 'always',
  },
  census: {
    icon: 'members',
    path: expandRoute('census'),
    displayText: 'Census',
    iconSize: 2.5,
    visibility: 'always',
  },
  profile: {
    icon: 'profile',
    path: expandRoute('profile'),
    displayText: 'Profile',
    iconSize: 3.2,
    visibility: 'authOnly',
  },
  admin: {
    icon: 'peace-sign',
    path: expandRoute('admin'),
    displayText: 'Admin Tools',
    visibility: 'authOnly',
  },
  signOut: {
    icon: 'sign-out',
    path: expandRoute('logout'),
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
