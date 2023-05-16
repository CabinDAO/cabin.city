import { IconName } from '@/components/core/Icon'
import { CitizenshipStatus } from '@/generated/graphql'

export const DEFAULT_CTA_TEXT = 'Get started'
export const MONTHLY_PRICE_IN_USD = 20
export const YEARLY_PRICE_IN_ETH = 0.2
export const YEARLY_PRICE_IN_USD = 400

export const DEFAULT_NFT_IMAGE = '/images/citizenship-thumbnail.png'

export interface UnlockNFT {
  tokenId: string
  mintedDate: Date
  expirationDate: Date
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
    profileCTAText: 'Pending vouch',
  },
  [CitizenshipStatus.Vouched]: {
    iconName: 'thumb-up',
    text: 'Vouched',
    profileCTAText: 'Join now',
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
