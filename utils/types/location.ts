// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { ProfileBasicFragment } from '@/utils/types/profile'
import { APIError, PageParams, Paginated } from '@/utils/types/shared'
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

export type LocationFragment = {
  createdAt: string
  externId: string
  type: LocationType
  name: string
  description: string
  address: AddressFragmentType | null
  bannerImageIpfsHash: string
  publishedAt: string | null
  steward: ProfileBasicFragment | null
  mediaItems: {
    category: LocationMediaCategory
    ipfsHash: string
  }[]
  // offers: OfferItemFragment[]
  eventCount: number
}

export const LocationListParams = z
  .object({
    locationType: z.nativeEnum(LocationType).optional(),
    lat: z.number().or(z.string()).pipe(z.coerce.number()).optional(), // sort by distance from this lat/lng
    lng: z.number().or(z.string()).pipe(z.coerce.number()).optional(), // sort by distance from this lat/lng
    maxDist: z.number().or(z.string()).pipe(z.coerce.number()).optional(), // filter by distance from lat/lng (km)
    latLngBounds: z.string().optional(), // filter by bounds
    countActiveEventsOnly: z
      .union([z.literal('true'), z.literal('false')])
      .optional(),
  })
  .merge(PageParams)
  .strict()
export type LocationListParamsType = z.infer<typeof LocationListParams>

export type LocationListResponse =
  | ({
      locations: LocationFragment[]
    } & Paginated)
  | APIError

export const LocationGetParams = z
  .object({
    countActiveEventsOnly: z
      .union([z.literal('true'), z.literal('false')])
      .optional(),
  })
  .strict()
export type LocationGetParamsType = z.infer<typeof LocationGetParams>

export type LocationGetResponse =
  | {
      location: LocationFragment
    }
  | APIError

export type LocationNewResponse =
  | {
      locationExternId: string
    }
  | APIError

export const LocationEditParams = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  published: z.union([z.literal('true'), z.literal('false')]).optional(),
  bannerImageIpfsHash: z.string().optional(),
  address: AddressFragment.nullable().optional(),
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

export type LocationEditResponse =
  | {
      location: LocationFragment
    }
  | APIError

export type LocationDeleteResponse = Record<string, never> | APIError

// must match LocationQueryInclude below
export type LocationWithRelations = Prisma.LocationGetPayload<{
  include: {
    address: true
    steward: {
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
    _count: {
      select: {
        offers: true
      }
    }
  }
}>

// must match LocationWithRelations type above
export const LocationQueryInclude = (
  params: {
    countActiveEventsOnly?: boolean
  } = {}
) => {
  return {
    address: true,
    steward: {
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
    _count: {
      select: {
        offers: params.countActiveEventsOnly
          ? { where: { endDate: { gte: new Date().toISOString() } } }
          : true,
      },
    },
  } satisfies Prisma.LocationInclude
}
