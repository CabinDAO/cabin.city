import { tokenIdFromBadgeId } from '@/lib/otterspace/otterspace-utils'
import { otterspaceConfig, unlockConfigForEnv } from 'lib/protocol-config'

export const getOtterSpaceOpenseaUrl = (badgeId: string) => {
  const tokenId = tokenIdFromBadgeId(badgeId)
  return `${getOpenSeaNetworkUrl(otterspaceConfig.networkName)}/${
    otterspaceConfig.contractAddress
  }/${tokenId}`
}

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
