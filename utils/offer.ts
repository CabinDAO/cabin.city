import { OfferListItemProps } from '@/components/core/OfferListItem'
import { OfferViewProps } from '@/components/offers/useGetOffer'
import {
  OfferFragment,
  OfferItemFragment,
  OfferPrice,
  OfferPriceUnit,
  OfferType,
} from '@/generated/graphql'
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

export const formatOfferPrice = (offerPrice: OfferPrice): string => {
  switch (offerPrice.unit) {
    case OfferPriceUnit.Hourly:
      return `$${offerPrice.amountCents / 100} / hour`
    case OfferPriceUnit.Daily:
      return `$${offerPrice.amountCents / 100} / day`
    case OfferPriceUnit.Weekly:
      return `$${offerPrice.amountCents / 100} / week`
    case OfferPriceUnit.Monthly:
      return `$${offerPrice.amountCents / 100} / month`
    case OfferPriceUnit.FlatFee:
    default:
      return `$${offerPrice.amountCents / 100}`
  }
}

export const offerListItemPropsFromFragment = (
  fragment: OfferItemFragment
): OfferListItemProps => {
  return {
    _id: fragment._id,
    offerType: fragment.offerType,
    locationType: fragment.locationType,
    title: fragment.title,
    profileRoleConstraints: fragment.profileRoleConstraints ?? [],
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

export const offerViewPropsFromFragment = (
  fragment: OfferFragment
): OfferViewProps => {
  return {
    _id: fragment._id,
    offerType: fragment.offerType,
    locationType: fragment.locationType,
    price: fragment.price,
    applicationUrl: fragment.applicationUrl,
    title: fragment.title,
    profileRoleConstraints: fragment.profileRoleConstraints ?? [],
    startDate: parseISO(fragment.startDate),
    endDate: parseISO(fragment.endDate),
    imageUrl: getImageUrlByIpfsHash(fragment.imageIpfsHash),
    location: {
      _id: fragment.location._id,
      name: fragment.location.name,
      shortAddress: formatShortAddress(fragment.location.address),
    },
    rawFragment: fragment,
  }
}
