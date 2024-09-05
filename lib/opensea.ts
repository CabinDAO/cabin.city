import { unlockConfigForEnv } from 'lib/protocol-config'

export const getUnlockOpenseaUrl = (tokenId: number) => {
  return `${getOpenSeaNetworkUrl(unlockConfigForEnv.networkName)}/${
    unlockConfigForEnv.contractAddress
  }/${tokenId}`
}

export const getOpenSeaNetworkUrl = (network: string) => {
  return {
    sepolia: 'https://testnets.opensea.io/assets/sepolia',
    optimism: 'https://opensea.io/assets/optimism',
    mainnet: 'https://opensea.io/assets/ethereum',
  }[network]
}
