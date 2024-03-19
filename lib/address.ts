import addressFormatter from '@fragaria/address-formatter'
import { EMPTY } from '@/utils/display-utils'

export interface FormatShortAddressParams {
  locality?: string | null | undefined
  admininstrativeAreaLevel1Short?: string | null | undefined
  country?: string | null | undefined
  countryShort?: string | null | undefined
}

export const formatShortAddress = (
  address: FormatShortAddressParams | null | undefined
): string => {
  if (!address) return EMPTY

  const formatted = addressFormatter.format(
    {
      city: address.locality || undefined,
      state: address.admininstrativeAreaLevel1Short || undefined,
    },
    {
      abbreviate: true,
      appendCountry: false,
      countryCode: address.countryShort || undefined,
      fallbackCountryCode: 'US',
    }
  )

  return formatted + (address.country ? ` | ${address.country}` : '')

  // if (!address.locality && !address.admininstrativeAreaLevel1Short) {
  //   return EMPTY
  // } else if (!address.locality) {
  //   return `${address.admininstrativeAreaLevel1Short ?? EMPTY} | ${
  //     address.country ?? EMPTY
  //   }`
  // } else {
  //   return `${address.locality ?? EMPTY}, ${
  //     address.admininstrativeAreaLevel1Short ?? EMPTY
  //   } | ${address.country ?? EMPTY}`
  // }
}
