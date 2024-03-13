import { http } from 'viem'
import { createConfig } from '@wagmi/core'
import { mainnet, optimism, sepolia, goerli } from '@wagmi/chains'
import { Alchemy, Network } from 'alchemy-sdk'
import { AlchemyProvider, ethers } from 'ethers'
import { isProd } from '../utils/dev'

export const chainConfig = createConfig({
  chains: [mainnet, sepolia, optimism, goerli],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID}`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID}`
    ),
    [goerli.id]: http(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID}`
    ),
    [optimism.id]: http(
      `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`
    ),
  },
})

export const defaultChain = isProd ? optimism : sepolia

export type NetworkName = 'mainnet' | 'sepolia' | 'optimism' | 'goerli'

// the new viem client
export function getAlchemyClient(network: NetworkName) {
  switch (network) {
    case 'mainnet':
      return chainConfig.getClient({ chainId: mainnet.id })
    case 'sepolia':
      return chainConfig.getClient({ chainId: sepolia.id })
    case 'optimism':
      return chainConfig.getClient({ chainId: optimism.id })
    case 'goerli':
      return chainConfig.getClient({ chainId: goerli.id })
    default:
      throw new Error(`Unsupported network: ${network}`)
  }
}

// the old ethers provider
export const getAlchemyProvider = (network: NetworkName): AlchemyProvider => {
  switch (network) {
    case 'mainnet':
    case 'sepolia':
    case 'goerli':
      return new ethers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
      )
    case 'optimism':
      return new ethers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID
      )
    default:
      throw new Error(`Unsupported network: ${network}`)
  }
}

export function getAlchemy(network: NetworkName): Alchemy {
  switch (network) {
    case 'mainnet':
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: Network.ETH_MAINNET,
      })
    case 'sepolia':
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: Network.ETH_SEPOLIA,
      })
    case 'optimism':
      new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: Network.OPT_MAINNET,
      })
    default:
      throw new Error(`Alchemy not implemented on ${network}`)
  }
}

export function getAlchemySdks(): Alchemy[] {
  return isProd
    ? [getAlchemy('mainnet'), getAlchemy('optimism')]
    : [getAlchemy('sepolia')]
}
