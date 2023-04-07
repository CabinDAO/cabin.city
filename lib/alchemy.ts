import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'

export const getAlchemyProvider = (network: ethers.providers.Networkish) => {
  console.log({ network })
  switch (network) {
    case 'mainnet':
    case 'goerli':
      return new ethers.providers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
      )
    case 'polygon':
    case 'polygonMumbai':
      return new ethers.providers.AlchemyProvider(
        network,
        process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_ID
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

export const getAlchemySdk = () =>
  new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
    network:
      process.env.NEXT_PUBLIC_USE_TESTNETS === 'true'
        ? Network.ETH_GOERLI
        : Network.ETH_MAINNET,
  })
