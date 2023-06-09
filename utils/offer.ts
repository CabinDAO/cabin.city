import { IconName } from '@/components/core/Icon'
import { OfferListItemProps } from '@/components/core/OfferListItem'
import { OfferViewProps } from '@/components/offers/useGetOffer'
import {
  MeFragment,
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
  fragment: OfferItemFragment,
  me: MeFragment | null | undefined
): OfferListItemProps => {
  return {
    _id: fragment._id,
    offerType: fragment.offerType,
    locationType: fragment.locationType,
    title: fragment.title,
    profileRoleConstraints: fragment.profileRoleConstraints ?? [],
    citizenshipRequired: fragment.citizenshipRequired,
    minimunCabinBalance: fragment.minimunCabinBalance,
    startDate: fragment.startDate ? parseISO(fragment.startDate) : null,
    endDate: fragment.endDate ? parseISO(fragment.endDate) : null,
    imageUrl: getImageUrlByIpfsHash(
      fragment.imageIpfsHash ?? fragment.location.bannerImageIpfsHash,
      true
    ),
    location: {
      _id: fragment.location._id,
      name: fragment.location.name,
      shortAddress: formatShortAddress(fragment.location.address),
      publishedAt: fragment.location.publishedAt
        ? parseISO(fragment.location.publishedAt)
        : null,
    },
    isLocked: !me,
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
    description: fragment.description,
    profileRoleConstraints: fragment.profileRoleConstraints ?? [],
    startDate: fragment.startDate ? parseISO(fragment.startDate) : null,
    endDate: fragment.endDate ? parseISO(fragment.endDate) : null,
    imageUrl: getImageUrlByIpfsHash(
      fragment.imageIpfsHash ?? fragment.location.bannerImageIpfsHash,
      true
    ),
    citizenshipRequired: fragment.citizenshipRequired,
    minimunCabinBalance: fragment.minimunCabinBalance,
    location: {
      _id: fragment.location._id,
      name: fragment.location.name,
      shortAddress: formatShortAddress(fragment.location.address),
      publishedAt: fragment.location.publishedAt
        ? parseISO(fragment.location.publishedAt)
        : null,
      caretaker: {
        _id: fragment.location.caretaker._id,
      },
    },
    rawFragment: fragment,
  }
}

export const labelByOfferPriceUnit = (unit: OfferPriceUnit): string => {
  switch (unit) {
    case OfferPriceUnit.Hourly:
      return 'Per Hour'
    case OfferPriceUnit.Daily:
      return 'Per Day'
    case OfferPriceUnit.Weekly:
      return 'Per Week'
    case OfferPriceUnit.Monthly:
      return 'Per Month'
    case OfferPriceUnit.FlatFee:
    default:
      return 'Flat Fee'
  }
}

export type RoleConstraintType = {
  constraintName: string
  iconName: IconName
}
