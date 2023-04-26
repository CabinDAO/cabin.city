interface FormatShortAddressParams {
  locality?: string | null | undefined
  admininstrativeAreaLevel1Short?: string | null | undefined
}
export const formatShortAddress = (
  address: FormatShortAddressParams | null | undefined
) => {
  return address
    ? `${address.locality}, ${address.admininstrativeAreaLevel1Short}`
    : null
}
