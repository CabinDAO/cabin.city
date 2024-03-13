import { NetworkName } from '@/lib/chains'

interface GetConfigArgs<T> extends Record<string, T> {
  dev: T
  prod: T
}

const getAppConfig = <T>(args: GetConfigArgs<T>): T => {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV
  if (!appEnv) {
    throw new Error('NEXT_PUBLIC_APP_ENV is not set')
  }

  const config = args[appEnv]
  if (!config) {
    throw new Error(`No config for app env: ${appEnv}`)
  }
  return config
}

type HatsConfig = {
  networkName: NetworkName
  contractAddress: string
  subgraphUrl: string
  initialBlock: bigint
  treeId: string
}

export const hatsConfig: HatsConfig = getAppConfig({
  dev: {
    // https://app.hatsprotocol.xyz/trees/11155111/145
    networkName: 'sepolia',
    contractAddress: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
    subgraphUrl:
      'https://api.studio.thegraph.com/query/55784/hats-v1-sepolia/version/latest',
    treeId: '0x00000091', // hat ids are hex and layered by byte groups - https://docs.hatsprotocol.xyz/for-developers/hats-protocol-overview/hat-ids
    initialBlock: BigInt('5465742'),
  },
  prod: {
    // https://app.hatsprotocol.xyz/trees/10/2
    networkName: 'optimism',
    contractAddress: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-v1-optimism',
    treeId: '0x00000002',
    initialBlock: BigInt('85223781'),
  },
})

type OtterspaceConfig = {
  networkName: NetworkName
  contractAddress: string
  subgraphUrl: string
  initialBlock: bigint
  raftId: string
}

export const otterspaceConfig: OtterspaceConfig = getAppConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-goerli',
    initialBlock: BigInt('7799232'),
    raftId: 'rafts:5', // Some random test raft on Goerli
  },
  prod: {
    networkName: 'optimism',
    contractAddress: '0x7F9279B24D1c36Fa3E517041fdb4E8788dc63D25',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
    initialBlock: BigInt('20256100'),
    raftId: 'rafts:50',
  },
})

type CabinTokenConfig = {
  networkName: NetworkName
  contractAddress: string
  initialBlock: bigint
}

export const cabinTokenConfig: CabinTokenConfig = getAppConfig({
  dev: {
    networkName: 'sepolia',
    contractAddress: '0x331E823689314B702396b97FF299D9D2968EFf47',
    initialBlock: BigInt('5471896'),
  },
  prod: {
    networkName: 'mainnet',
    contractAddress: '0x1934e252f840aa98dfce2b6205b3e45c41aef830',
    initialBlock: BigInt('13636062'),
  },
})

type UnlockConfig = {
  networkName: NetworkName
  chainId: number
  contractAddress: string
  etherscanUrl: string
}

export const unlockConfig: UnlockConfig = getAppConfig({
  dev: {
    networkName: 'sepolia',
    chainId: 11155111,
    contractAddress: '0xdbdd8b233bed095db975f2cd527a714c5fc7db62',
    etherscanUrl: 'https://sepolia.etherscan.io',
  },
  prod: {
    networkName: 'optimism',
    chainId: 10,
    contractAddress: '0x45aCCac0E5C953009cDa713a3b722F87F2907F86',
    etherscanUrl: 'https://optimistic.etherscan.io',
  },
})
