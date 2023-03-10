import { otterspaceConfig } from 'lib/protocol-config'

export const getOtterSpaceOpenseaUrl = (tokenId: string) => {
  return `${getOpenSeaNetworkUrl(otterspaceConfig.networkName)}/${
    otterspaceConfig.contractAddress
  }/${tokenId}`
}

export const getOpenSeaNetworkUrl = (network: string) => {
  return {
    goerli: 'https://testnets.opensea.io/assets/goerli',
    mumbai: 'https://testnets.opensea.io/assets/mumbai',
    matic: 'https://testnets.opensea.io/assets/goerli',
    optimism: 'https://opensea.io/assets/optimism',
    mainnet: 'https://opensea.io/assets/ethereum',
  }[network]
}
