import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'

// TODO: switch to viem

export const getAlchemyProvider = (network: ethers.providers.Networkish) => {
  switch (network) {
    case 'mainnet':
    case 'goerli':
      return new ethers.providers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
      )
    case 'optimism':
      return new ethers.providers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID
      )
    default:
      throw new Error(`Unsupported network: ${network}`)
  }
}

export const getAlchemySdks = (): Alchemy[] => {
  if (process.env.NEXT_PUBLIC_USE_TESTNETS === 'true') {
    return [
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: Network.ETH_GOERLI,
      }),
    ]
  } else {
    return [
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: Network.ETH_MAINNET,
      }),
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID,
        network: Network.OPT_MAINNET,
      }),
    ]
  }
}
