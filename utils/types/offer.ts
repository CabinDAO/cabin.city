// need these types in a separate file because prisma cant be imported in the frontend

import {
  AddressFragment,
  LocationFragment,
  LocationMediaCategory,
  LocationType,
  ShortAddressFragment,
} from '@/utils/types/location'
import { Prisma } from '@prisma/client'

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
    address: ShortAddressFragment | null
    caretaker: {
      externId: string
    }
  }
}

export type OfferListParams = {
  locationId?: string
  offerType?: OfferType
  publishedOnly?: 'true' | 'false'
  page?: number
}

export type OfferListResponse = {
  offers?: OfferFragment[]
  count?: number
  error?: string
}

export type OfferNewParams = {
  locationExternId?: string
  offerType?: OfferType
}

export type OfferNewResponse = {
  offerExternId?: string
  error?: string
}

export type OfferGetResponse = {
  offer?: OfferFragment
  error?: string
}

export type OfferEditParams = {
  title?: string
  description?: string
  startDate?: string
  endDate?: string
  price?: number
  priceInterval?: OfferPriceInterval
  applicationUrl?: string
  imageIpfsHash?: string
  mediaItems?: {
    ipfsHash: string
  }[]
}

export type OfferEditResponse = {
  offer?: OfferFragment | null
  error?: string
}

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
    },
  },
} satisfies Prisma.OfferInclude
