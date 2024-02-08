// need these types in a separate file because prisma cant be imported in the frontend

import {
  BadgeFragment,
  CitizenshipStatus,
  RoleFragment,
} from '@/utils/types/profile'
import { LocationFragment, ShortAddressFragment } from '@/utils/types/location'
import { OfferFragment } from '@/utils/types/offer'

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
    location?: Pick<
      LocationFragment,
      | 'externId'
      | 'name'
      | 'tagline'
      | 'bannerImageIpfsHash'
      | 'sleepCapacity'
      | 'offerCount'
      | 'voteCount'
    > & { address: ShortAddressFragment }
    offer?: Pick<
      OfferFragment,
      | 'externId'
      | 'type'
      | 'title'
      | 'imageIpfsHash'
      | 'startDate'
      | 'endDate'
      | 'location'
    >
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
  activities?: ActivityListFragment[]
  count?: number
  error?: string
}

export type ActivityReactParams = {
  externId: string
  action: 'like' | 'unlike'
}

export type ActivityReactResponse = {
  error?: string
}

export type ActivityNewParams = {
  text: string
}

export type ActivityNewResponse = {
  externId: string
  error?: string
}

export type ActivityDeleteResponse = {
  error?: string
}
