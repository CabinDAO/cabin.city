// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { LocationType, ShortAddressFragmentType } from '@/utils/types/location'
import { APIError, PageParams, Paginated } from '@/utils/types/shared'

// must match prisma's $Enums.OfferType
export enum EventType {
  PaidColiving = 'PaidColiving',
  Residency = 'Residency',
  CabinWeek = 'CabinWeek',
  Event = 'Event',
}

// must match prisma's $Enums.OfferPriceInterval
export enum OfferPriceInterval {
  FlatFee = 'FlatFee',
  Hourly = 'Hourly',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export type EventMediaItemFragment = {
  ipfsHash: string
}

export type EventFragment = {
  externId: string
  type: EventType
  title: string
  description: string
  startDate: string
  endDate: string
  imageIpfsHash: string
  price: number
  priceInterval: OfferPriceInterval
  applicationUrl: string
  mediaItems: EventMediaItemFragment[]
  location: {
    externId: string
    name: string
    type: LocationType
    bannerImageIpfsHash: string
    bannerImageCfId: string
    address: ShortAddressFragmentType | null
    steward: {
      externId: string
    } | null
  }
}

export const EventListParams = z
  .object({
    locationId: z.string().optional(),
    eventType: z.nativeEnum(EventType).optional(),
    futureOnly: z.union([z.literal('true'), z.literal('false')]).optional(),
  })
  .merge(PageParams)
  .strict()
export type EventListParamsType = z.infer<typeof EventListParams>

export type EventListResponse =
  | ({
      events: EventFragment[]
    } & Paginated)
  | APIError

export const EventNewParams = z
  .object({
    locationExternId: z.string(),
  })
  .strict()
export type EventNewParamsType = z.infer<typeof EventNewParams>

export type EventNewResponse =
  | {
      eventExternId: string
    }
  | APIError

export type EventGetResponse =
  | {
      event: EventFragment
    }
  | APIError

export const EventEditParams = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    price: z.number().optional(),
    priceInterval: z.nativeEnum(OfferPriceInterval).optional(),
    applicationUrl: z.string().optional(),
    mediaItems: z
      .array(
        z.object({
          ipfsHash: z.string(),
        })
      )
      .optional(),
  })
  .strict()
export type EventEditParamsType = z.infer<typeof EventEditParams>

export type EventEditResponse =
  | {
      event: EventFragment | null
    }
  | APIError

export type EventDeleteResponse = Record<string, never> | APIError

// must match EventQueryInclude below
export type EventWithRelations = Prisma.OfferGetPayload<{
  include: {
    mediaItems: true
    location: {
      include: {
        address: true
        steward: {
          select: {
            externId: true
          }
        }
      }
    }
  }
}>

// must match EventWithRelations type above
export const EventQueryInclude = {
  mediaItems: true,
  location: {
    include: {
      address: true,
      steward: {
        select: {
          externId: true,
        },
      },
    },
  },
} satisfies Prisma.OfferInclude
