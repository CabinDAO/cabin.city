import { fetchEnsAddress } from '@wagmi/core'
import { ethers } from 'ethers'

export const resolveAddressOrName = async (addressOrName: string) => {
  if (ethers.utils.isAddress(addressOrName)) {
    return addressOrName
  } else if (addressOrName.endsWith('.eth')) {
    const address = await fetchEnsAddress({ name: addressOrName })
    return address
  }

  // The input is neither an address nor a name
  return undefined
}
