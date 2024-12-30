import { IconName } from '@/components/core/Icon'
import { CitizenshipStatus } from '@/utils/types/profile'

export const YEARLY_PRICE_IN_USD = 420
export const MINIMUM_CABIN_BALANCE = 1000

export const DEFAULT_NFT_IMAGE = '/images/citizenship-thumbnail.png'

export interface UnlockNFT {
  tokenId: string
  mintedDate: Date
  expirationDate: Date | null
  image: string
}

export interface CitizenshipInfo {
  text: string
  iconName: IconName
  profileCTAText: string
}

const CitizenshipInfoByStatus: Record<CitizenshipStatus, CitizenshipInfo> = {
  [CitizenshipStatus.Verified]: {
    iconName: 'citizen',
    text: 'Citizen',
    profileCTAText: 'Renew',
  },
  [CitizenshipStatus.VouchRequested]: {
    iconName: 'thumb-up-outline',
    text: 'Vouch Requested',
    profileCTAText: 'Continue',
  },
  [CitizenshipStatus.Vouched]: {
    iconName: 'thumb-up',
    text: 'Vouched',
    profileCTAText: 'Continue',
  },
}

export const citizenshipInfoFromStatus = (
  status: CitizenshipStatus | undefined | null
): CitizenshipInfo | null => {
  if (!status) return null
  return CitizenshipInfoByStatus[status]
}

export const allCitizenshipStatuses = Object.values(CitizenshipStatus).map(
  (citizenshipStatus) => ({
    ...citizenshipInfoFromStatus(citizenshipStatus),
    citizenshipStatus,
  })
)
