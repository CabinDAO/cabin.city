import { OfferListItemProps } from '@/components/core/OfferListItem'
import { OfferItemFragment, OfferType } from '@/generated/graphql'
import { formatShortAddress } from '@/lib/address'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { parseISO } from 'date-fns'

export interface OfferInfo {
  name: string
}

export const OfferInfoByType: Record<OfferType, OfferInfo> = {
  [OfferType.PaidColiving]: {
    name: 'Colive',
  },
  [OfferType.Residency]: {
    name: 'Residency',
  },
  [OfferType.BuildAndGrowWeek]: {
    name: 'Build Week',
  },
}

export const offerInfoFromType = (offerType: OfferType): OfferInfo => {
  return OfferInfoByType[offerType]
}

export const allOfferInfos = Object.values(OfferType).map((offerType) => ({
  ...offerInfoFromType(offerType),
  offerType,
}))

export const offerListItemPropsFromFragment = (
  fragment: OfferItemFragment
): OfferListItemProps => {
  return {
    _id: fragment._id,
    offerType: fragment.offerType,
    locationType: fragment.locationType,
    title: fragment.title,
    startDate: parseISO(fragment.startDate),
    endDate: parseISO(fragment.endDate),
    imageUrl: getImageUrlByIpfsHash(fragment.imageIpfsHash),
    location: {
      _id: fragment.location._id,
      name: fragment.location.name,
      shortAddress: formatShortAddress(fragment.location.address),
    },
  }
}
