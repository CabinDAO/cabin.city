import { Alchemy } from 'alchemy-sdk'
import { ethers } from 'ethers'

const goerliProvider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY
)

export const getAlchemyProvider = (network: ethers.providers.Networkish) => {
  switch (network) {
    case 'goerli':
      return goerliProvider
    default:
      throw new Error(`Unsupported network: ${network}`)
  }
}

export const getAlchemySdk = (network: ethers.providers.Networkish) => {
  switch (network) {
    case 'goerli':
    case 'Goerli':
      return new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY,
      })
    default:
      throw new Error(`Unsupported network: ${network}`)
  }
}
