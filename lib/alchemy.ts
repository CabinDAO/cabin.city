import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'
import { Chain } from 'wagmi'

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

export const getAlchemySdk = (chain: Chain) => {
  switch (chain.network) {
    case 'goerli':
    case 'homestead':
      return new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID,
        network: chain.testnet ? Network.ETH_GOERLI : Network.ETH_MAINNET,
      })
    case 'matic':
    case 'maticmum':
      return new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_ID,
        network: chain.testnet ? Network.MATIC_MUMBAI : Network.MATIC_MAINNET,
      })
    case 'optimism':
      return new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID,
        network: chain.testnet ? Network.ETH_GOERLI : Network.OPT_MAINNET,
      })
    default:
      throw new Error(`Unsupported network: ${chain.name}`)
  }
}
