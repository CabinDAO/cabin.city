import { IconName } from '@/components/core/Icon'

export type MenuItemOption =
  | 'home'
  | 'members'
  | 'neighborhoods'
  | 'profile'
  | 'citizenship'
  | 'myLocations'
  | 'signOut'
  | 'offers'
  | 'signIn'

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
  offers: {
    icon: 'offer',
    path: '/offers',
    displayText: 'Offers',
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
    path: '/landing',
    displayText: 'Home',
    iconSize: 3.2,
  },
  members: null,
  offers: {
    icon: 'offer',
    path: '/offers',
    displayText: 'Offers',
    iconSize: 2.5,
  },
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
  signOut: null,
  signIn: {
    icon: 'profile',
    path: '/login',
    displayText: 'Sign In',
  },
}
