import { createPublicClient, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'
import { getEnsAddress } from 'viem/ens'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
    ? http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID}`
      )
    : http(),
})

// TODO: could memoize this
export const resolveAddressOrName = async (
  addressOrName: string
): Promise<string | undefined> => {
  if (isAddress(addressOrName)) {
    return addressOrName
  } else if (addressOrName.endsWith('.eth')) {
    return (
      (await getEnsAddress(publicClient, {
        name: normalize(addressOrName),
      })) ?? undefined
    )
  }

  // The input is neither an address nor a name
  return undefined
}
