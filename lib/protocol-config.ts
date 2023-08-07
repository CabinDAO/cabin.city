import { getAppConfig } from '@/utils/app-config'
import { BigNumber } from 'ethers'

interface HatsConfig {
  networkName: string
  contractAddress: string
  subgraphUrl: string
  initialBlock: BigNumber
  treeId: string
}

export const hatsConfig: HatsConfig = getAppConfig({
  dev: {
    // https://app.hatsprotocol.xyz/trees/5/10
    networkName: 'goerli',
    contractAddress: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-v1-goerli',
    treeId: '0x0000000a', // hat ids are hex and layered by byte groups - https://docs.hatsprotocol.xyz/for-developers/hats-protocol-overview/hat-ids
    initialBlock: BigNumber.from('8752122'),
  },
  prod: {
    // https://app.hatsprotocol.xyz/trees/10/2
    networkName: 'optimism',
    contractAddress: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-v1-optimism',
    treeId: '0x00000002',
    initialBlock: BigNumber.from('85223781'),
  },
})

interface OtterspaceConfig {
  networkName: string
  contractAddress: string
  subgraphUrl: string
  initialBlock: BigNumber
  raftId: string
}

export const otterspaceConfig: OtterspaceConfig = getAppConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-goerli',
    initialBlock: BigNumber.from('7799232'),
    raftId: 'rafts:5', // Some random test raft on Goerli
  },
  prod: {
    networkName: 'optimism',
    contractAddress: '0x7F9279B24D1c36Fa3E517041fdb4E8788dc63D25',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
    initialBlock: BigNumber.from('20256100'),
    raftId: 'rafts:50',
  },
})

interface CabinTokenConfig {
  networkName: string
  contractAddress: string
  initialBlock: BigNumber
}

export const cabinTokenConfig: CabinTokenConfig = getAppConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0x096ea5c03c3643f48d7ae0bac629bae5a8645f2e',
    initialBlock: BigNumber.from('8469552'),
  },
  prod: {
    networkName: 'mainnet',
    contractAddress: '0x1934e252f840aa98dfce2b6205b3e45c41aef830',
    initialBlock: BigNumber.from('13636062'),
  },
})

interface UnlockConfig {
  networkName: string
  chainId: number
  contractAddress: string
  etherscanUrl: string
}
export const unlockConfig: UnlockConfig = getAppConfig({
  dev: {
    networkName: 'goerli',
    chainId: 5,
    contractAddress: '0xAAae475e2e1D92Ffd4a103A72FDc9f5301896e28',
    etherscanUrl: 'https://goerli.etherscan.io',
  },
  prod: {
    networkName: 'optimism',
    chainId: 10,
    contractAddress: '0x45aCCac0E5C953009cDa713a3b722F87F2907F86',
    etherscanUrl: 'https://optimistic.etherscan.io',
  },
})
