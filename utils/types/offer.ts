// must match prisma's $Enums.OfferType
export enum OfferType {
  PaidColiving = 'PaidColiving',
  Residency = 'Residency',
  CabinWeek = 'CabinWeek',
}

export const OfferNameByType: Record<string, string> = {
  [OfferType.PaidColiving]: 'Colive',
  [OfferType.Residency]: 'Residency',
  [OfferType.CabinWeek]: 'Cabin Week',
}

export type OfferItem = {
  externId: string
  type: string
  title: string
  description: string
  startDate: string
  endDate: string
  imageIpfsHash: string
  price: {
    unit: string
    amountCents: number
  }
  location: {
    externId: string
    name: string
    bannerImageIpfsHash: string
    publishedAt: string | null
    address: {
      locality: string
      admininstrativeAreaLevel1Short: string
      country: string
    } | null
  }
}
