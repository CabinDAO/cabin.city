import { IconName } from '@/components/core/Icon'
import { CitizenshipStatus } from '@/generated/graphql'

export interface CitizenshipInfo {
  text: string
  iconName: IconName
}

const CitizenshipInfoByStatus: Record<CitizenshipStatus, CitizenshipInfo> = {
  [CitizenshipStatus.Verified]: {
    iconName: 'citizen',
    text: 'Citizen',
  },
  [CitizenshipStatus.VouchRequested]: {
    iconName: 'thumb-up-outline',
    text: 'Vouch Requested',
  },
  [CitizenshipStatus.Vouched]: {
    iconName: 'thumb-up',
    text: 'Vouched',
  },
}

export const citizenshipInfoFromStatus = (
  status: CitizenshipStatus | undefined | null
): CitizenshipInfo | null => {
  if (!status) return null
  return CitizenshipInfoByStatus[status]
}
