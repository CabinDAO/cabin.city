import { IconName } from '@/components/core/Icon'

export type MenuItemOption =
  | 'home'
  | 'members'
  | 'activity'
  | 'neighborhoods'
  | 'profile'
  | 'citizenship'
  | 'myLocations'
  | 'invite'
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
  activity: {
    icon: 'dashboard',
    path: '/dashboard',
    displayText: 'Activity',
    iconSize: 2.5,
  },
  members: {
    icon: 'members',
    path: '/census',
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
  myLocations: {
    icon: 'draft-proposal',
    path: '/my-locations',
    displayText: 'My Locations',
  },
  invite: {
    icon: 'plus',
    path: '/invite',
    displayText: 'Invite',
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
  activity: null,
  members: null,
  neighborhoods: {
    icon: 'neighborhoods',
    path: '/city-directory',
    displayText: 'City Directory',
    iconSize: 2,
  },
  myLocations: {
    icon: 'draft-proposal',
    path: '/my-locations',
    displayText: 'My Locations',
    iconSize: 2,
  },
  profile: null,
  citizenship: null,
  invite: null,
  admin: null,
  signOut: null,
  signIn: {
    icon: 'profile',
    path: '/?signin=true',
    displayText: 'Sign In',
  },
}
