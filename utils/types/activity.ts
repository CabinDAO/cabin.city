// need these types in a separate file because prisma cant be imported in the frontend

import {
  BadgeFragment,
  CitizenshipStatus,
  RoleFragment,
} from '@/utils/types/profile'
import { LocationItem } from '@/utils/types/location'
import { OfferItem } from '@/utils/types/offer'

export const PAGE_SIZE = 20

// must match prisma's $Enums.ActivityType
export enum ActivityType {
  Text = 'Text',
  ProfileCreated = 'ProfileCreated',
  RoleAdded = 'RoleAdded',
  BadgeAdded = 'BadgeAdded',
  CitizenshipVerified = 'CitizenshipVerified',
  LocationPublished = 'LocationPublished',
  OfferCreated = 'OfferCreated',
  VouchRequested = 'VouchRequested',
}

export type ActivityListFragment = {
  externId: string
  createdAt: string
  type: ActivityType
  text: string
  metadata: {
    citizenshipTokenId?: number
    badge?: BadgeFragment
    role?: RoleFragment
    location?: LocationItem // todo: a lot of the data returned here is not used
    offer?: OfferItem // todo: a lot of the data returned here is not used
  }

  profile: {
    externId: string
    name: string
    citizenshipStatus: CitizenshipStatus | null
    roles: RoleFragment[]
    avatarUrl: string
  }

  reactionCount: number
  hasReactionByMe: boolean
}

export type ActivityListParams = {
  profileId?: string
  page?: number
  pageSize?: number
}

export type ActivityListResponse = {
  activities: ActivityListFragment[]
  count: number
  error?: string
}

export type ActivityReactParams = {
  externId: string
  action: 'like' | 'unlike'
}

export type ActivityReactResponse = {
  success: boolean
  error?: string
}
