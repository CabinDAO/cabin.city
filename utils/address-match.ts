// Compare two addresses and return true if they match.
export function addressMatch(address1: string, address2: string) {
  return address1?.toLocaleLowerCase() === address2?.toLocaleLowerCase()
}
