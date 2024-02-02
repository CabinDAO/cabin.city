// need these types in a separate file because prisma cant be imported in the frontend

import { LocationType, ShortAddressFragment } from '@/utils/types/location'
import { Prisma } from '@prisma/client'

// must match prisma's $Enums.OfferType
export enum OfferType {
  PaidColiving = 'PaidColiving',
  Residency = 'Residency',
  CabinWeek = 'CabinWeek',
}

// must match prisma's $Enums.OfferPriceUnit
export enum OfferPriceUnit {
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

export type OfferFragment = {
  externId: string
  type: OfferType
  title: string
  description: string
  startDate: string
  endDate: string
  imageIpfsHash: string
  price: {
    unit: OfferPriceUnit
    amountCents: number
  }
  location: {
    externId: string
    name: string
    type: LocationType
    bannerImageIpfsHash: string
    publishedAt: string | null
    address: ShortAddressFragment | null
  }
}

export type OfferListParams = {
  locationId?: string
  offerType?: OfferType
  page?: number
}

export type OfferListResponse = {
  offers?: OfferFragment[]
  count?: number
  error?: string
}

// must match OfferQueryInclude below
export type OfferWithRelations = Prisma.OfferGetPayload<{
  include: {
    location: {
      include: {
        address: true
      }
    }
  }
}>

// must match OfferWithRelations type above
export const OfferQueryInclude: Prisma.OfferInclude = {
  location: {
    include: {
      address: true,
    },
  },
}
