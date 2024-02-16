// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { AvatarFragment, ProfileBasicFragment } from '@/utils/types/profile'
import { OfferType } from '@/utils/types/offer'
import { APIError, Paginated } from '@/utils/types/shared'

// must match prisma's $Enums.LocationType
export enum LocationType {
  Outpost = 'Outpost',
  Neighborhood = 'Neighborhood',
}

// must match prisma's $Enums.LocationMediaCategory
export enum LocationMediaCategory {
  Sleeping = 'Sleeping',
  Working = 'Working',
  Features = 'Features',
}

export enum LocationSort {
  nameAsc = 'nameAsc',
  votesDesc = 'votesDesc',
}

export type AddressFragment = {
  lat: number | null
  lng?: number | null
  formattedAddress: string | null
  streetNumber: string | null
  route: string | null
  routeShort: string | null
  locality: string | null
  admininstrativeAreaLevel1: string | null
  admininstrativeAreaLevel1Short: string | null
  country: string | null
  countryShort: string | null
  postalCode: string | null
}

export type ShortAddressFragment = Pick<
  AddressFragment,
  'locality' | 'admininstrativeAreaLevel1Short' | 'country'
>

export type RecentVoterFragment = {
  externId: string
  avatar: AvatarFragment
}

export type LocationFragment = {
  createdAt: string
  externId: string
  type: LocationType
  name: string
  tagline: string
  description: string
  address: AddressFragment | null
  bannerImageIpfsHash: string
  sleepCapacity: number
  internetSpeedMbps: number
  caretaker: ProfileBasicFragment
  caretakerEmail: string | null
  publishedAt: string | null
  mediaItems: {
    category: LocationMediaCategory
    ipfsHash: string
  }[]
  // offers: OfferItemFragment[]
  offerCount: number
  recentVoters: RecentVoterFragment[]
  voteCount: number
}

export type LocationListParams = {
  // searchQuery?: string
  offerType?: OfferType
  locationType?: LocationType
  sort?: LocationSort
  page?: number
}

export type LocationListResponse =
  | ({
      locations: LocationFragment[]
    } & Paginated)
  | APIError

export type LocationMineResponse = {
  locations?: LocationFragment[]
  count?: number
  error?: string
}

export type LocationGetResponse = {
  location?: LocationFragment | null
  error?: string
}

export type LocationNewResponse = {
  locationExternId?: string
  error?: string
}

export type LocationEditParams = {
  name?: string
  tagline?: string
  description?: string
  address?: AddressFragment | null
  sleepCapacity?: number
  internetSpeedMbps?: number
  caretakerEmail?: string | null
  bannerImageIpfsHash?: string
  mediaItems?: {
    category: LocationMediaCategory
    ipfsHash: string
  }[]
}

export type LocationEditResponse = {
  location?: LocationFragment | null
  error?: string
}

export type LocationDeleteResponse = {
  error?: string
}

export type LocationPublishResponse = {
  publishedAt?: string
  error?: string
}

// must match LocationQueryInclude below
export type LocationWithRelations = Prisma.LocationGetPayload<{
  include: {
    address: true
    caretaker: {
      include: {
        avatar: {
          select: {
            url: true
          }
        }
        wallet: {
          select: {
            cabinTokenBalance: true
          }
        }
        roles: {
          include: {
            walletHat: true
          }
        }
      }
    }
    mediaItems: true
    votes: {
      select: {
        count: true
        profile: {
          select: {
            externId: true
            avatar: {
              select: {
                url: true
              }
            }
          }
        }
      }
    }
    _count: {
      select: {
        offers: true
      }
    }
  }
}>

// must match LocationWithRelations type above
export const LocationQueryInclude = {
  address: true,
  caretaker: {
    include: {
      avatar: {
        select: {
          url: true,
        },
      },
      wallet: {
        select: {
          cabinTokenBalance: true,
        },
      },
      roles: {
        include: {
          walletHat: true,
        },
      },
    },
  },
  mediaItems: true,
  votes: {
    select: {
      count: true,
      profile: {
        select: {
          externId: true,
          avatar: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  },
  _count: {
    select: {
      offers: true,
    },
  },
} satisfies Prisma.LocationInclude
