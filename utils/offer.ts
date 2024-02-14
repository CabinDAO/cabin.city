import { IconName } from '@/components/core/Icon'
import { OfferType } from '@/utils/types/offer'

export interface OfferInfo {
  name: string
}

const OfferInfoByType: Record<OfferType, OfferInfo> = {
  [OfferType.PaidColiving]: {
    name: 'Colive',
  },
  [OfferType.Residency]: {
    name: 'Residency',
  },
  [OfferType.CabinWeek]: {
    name: 'Cabin Week',
  },
}

export const offerInfoFromType = (offerType: OfferType): OfferInfo => {
  return OfferInfoByType[offerType]
}

export type RoleConstraintType = {
  constraintName: string
  iconName: IconName
}
