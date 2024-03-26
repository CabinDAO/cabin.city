// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { LocationType, ShortAddressFragmentType } from '@/utils/types/location'
import { APIError, Paginated } from '@/utils/types/shared'

// must match prisma's $Enums.OfferType
export enum OfferType {
  PaidColiving = 'PaidColiving',
  Residency = 'Residency',
  CabinWeek = 'CabinWeek',
}

// must match prisma's $Enums.OfferPriceInterval
export enum OfferPriceInterval {
  FlatFee = 'FlatFee',
  Hourly = 'Hourly',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export const OfferNameByType: Record<string, string> = {
  [OfferType.PaidColiving]: 'Colive',
  [OfferType.Residency]: 'Residency',
  [OfferType.CabinWeek]: 'Cabin Week',
}

export type OfferMediaItemFragment = {
  ipfsHash: string
}

export type OfferFragment = {
  externId: string
  type: OfferType
  title: string
  description: string
  startDate: string
  endDate: string
  imageIpfsHash: string
  price: number
  priceInterval: OfferPriceInterval
  applicationUrl: string
  mediaItems: OfferMediaItemFragment[]
  location: {
    externId: string
    name: string
    type: LocationType
    bannerImageIpfsHash: string
    publishedAt: string | null
    address: ShortAddressFragmentType | null
    caretaker: {
      externId: string
    }
  }
}

export const OfferListParams = z
  .object({
    locationId: z.string().optional(),
    offerType: z.nativeEnum(OfferType).optional(),
    publiclyVisibleOnly: z
      .union([z.literal('true'), z.literal('false')])
      .optional(),
    page: z.coerce.number().optional(),
  })
  .strict()
export type OfferListParamsType = z.infer<typeof OfferListParams>

export type OfferListResponse =
  | ({
      offers: OfferFragment[]
    } & Paginated)
  | APIError

export type OfferNewParams = {
  locationExternId?: string
  offerType?: OfferType
}

export type OfferNewResponse =
  | {
      offerExternId: string
    }
  | APIError

export type OfferGetResponse =
  | {
      offer: OfferFragment
    }
  | APIError

export const OfferEditParams = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    price: z.number().optional(),
    priceInterval: z.nativeEnum(OfferPriceInterval).optional(),
    applicationUrl: z.string().optional(),
    imageIpfsHash: z.string().optional(),
    mediaItems: z
      .array(
        z.object({
          ipfsHash: z.string(),
        })
      )
      .optional(),
  })
  .strict()
export type OfferEditParamsType = z.infer<typeof OfferEditParams>

export type OfferEditResponse =
  | {
      offer: OfferFragment | null
    }
  | APIError

export type OfferDeleteResponse = {
  error?: string
}

// must match OfferQueryInclude below
export type OfferWithRelations = Prisma.OfferGetPayload<{
  include: {
    mediaItems: true
    location: {
      include: {
        address: true
        caretaker: {
          select: {
            externId: true
          }
        }
      }
    }
  }
}>

// must match OfferWithRelations type above
export const OfferQueryInclude = {
  mediaItems: true,
  location: {
    include: {
      address: true,
      caretaker: {
        select: {
          externId: true,
        },
      },
    },
  },
} satisfies Prisma.OfferInclude
