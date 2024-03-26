// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import {
  AvatarFragmentType,
  ProfileBasicFragment,
  ProfileNewParams,
} from '@/utils/types/profile'
import { OfferType } from '@/utils/types/offer'
import { APIError, Paginated } from '@/utils/types/shared'
import { z } from 'zod'

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

export const AddressFragment = z
  .object({
    lat: z.number().nullable(),
    lng: z.number().nullable(),
    formattedAddress: z.string().nullable(),
    streetNumber: z.string().nullable(),
    route: z.string().nullable(),
    routeShort: z.string().nullable(),
    locality: z.string().nullable(),
    admininstrativeAreaLevel1: z.string().nullable(),
    admininstrativeAreaLevel1Short: z.string().nullable(),
    country: z.string().nullable(),
    countryShort: z.string().nullable(),
    postalCode: z.string().nullable(),
  })
  .strict()

export type AddressFragmentType = z.infer<typeof AddressFragment>

export type ShortAddressFragmentType = Pick<
  AddressFragmentType,
  'locality' | 'admininstrativeAreaLevel1Short' | 'country' | 'countryShort'
>

export type RecentVoterFragment = {
  externId: string
  avatar: AvatarFragmentType
}

export type LocationFragment = {
  createdAt: string
  externId: string
  type: LocationType
  name: string
  tagline: string
  description: string
  address: AddressFragmentType | null
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

export const LocationListParams = z
  .object({
    offerType: z.nativeEnum(OfferType).optional(),
    locationType: z.nativeEnum(LocationType).optional(),
    sort: z.nativeEnum(LocationSort).optional(),
    page: z.coerce.number().optional(),
  })
  .strict()
export type LocationListParamsType = z.infer<typeof LocationListParams>

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

export const LocationEditParams = z.object({
  name: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  address: AddressFragment.nullable().optional(),
  sleepCapacity: z.number().optional(),
  internetSpeedMbps: z.number().optional(),
  caretakerEmail: z.string().nullable().optional(),
  bannerImageIpfsHash: z.string().optional(),
  mediaItems: z
    .array(
      z.object({
        category: z.nativeEnum(LocationMediaCategory),
        ipfsHash: z.string(),
      })
    )
    .optional(),
})
export type LocationEditParamsType = z.infer<typeof LocationEditParams>

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
