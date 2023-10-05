import { EMPTY } from '@/utils/display-utils'

interface FormatShortAddressParams {
  locality?: string | null | undefined
  admininstrativeAreaLevel1Short?: string | null | undefined
  country?: string | null | undefined
}

export const formatShortAddress = (
  address: FormatShortAddressParams | null | undefined
): string => {
  if (!address) return EMPTY

  if (!address.locality && !address.admininstrativeAreaLevel1Short) {
    return EMPTY
  } else if (!address.locality) {
    return `${address.admininstrativeAreaLevel1Short ?? EMPTY} | ${
      address.country ?? EMPTY
    }`
  } else {
    return `${address.locality ?? EMPTY}, ${
      address.admininstrativeAreaLevel1Short ?? EMPTY
    } | ${address.country ?? EMPTY}`
  }
}
