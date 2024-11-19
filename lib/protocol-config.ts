import { NetworkName } from '@/lib/chains'
import { isProd } from '@/utils/dev'

interface GetConfigArgs<T> extends Record<string, T> {
  dev: T
  prod: T
}

const getAppConfig = <T>(args: GetConfigArgs<T>): T => {
  const appEnv = isProd ? 'prod' : 'dev'
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
    contractAddress: '0x3bc1a0ad72417f2d411118085256fc53cbddd137',
    subgraphUrl:
      'https://api.studio.thegraph.com/query/55784/hats-v1-sepolia/version/latest',
    treeId: '0x00000091', // hat ids are hex and layered by byte groups - https://docs.hatsprotocol.xyz/for-developers/hats-protocol-overview/hat-ids
    initialBlock: BigInt('5465742'),
  },
  prod: {
    // https://app.hatsprotocol.xyz/trees/10/2
    networkName: 'optimism',
    contractAddress: '0x3bc1a0ad72417f2d411118085256fc53cbddd137',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-v1-optimism',
    treeId: '0x00000002',
    initialBlock: BigInt('85223781'),
  },
})

type CabinTokenConfig = {
  networkName: NetworkName
  contractAddress: string
  initialBlock: bigint
}

export const cabinTokenConfigs: {
  [key in 'dev' | 'prod']: CabinTokenConfig
} = {
  dev: {
    networkName: 'sepolia',
    contractAddress: '0x331e823689314b702396b97ff299d9d2968eff47',
    initialBlock: BigInt('5471896'),
  },
  prod: {
    networkName: 'mainnet',
    contractAddress: '0x1934e252f840aa98dfce2b6205b3e45c41aef830',
    initialBlock: BigInt('13636062'),
  },
}

export const cabinTokenConfigForEnv: CabinTokenConfig =
  getAppConfig(cabinTokenConfigs)

type UnlockConfig = {
  networkName: NetworkName
  chainId: number
  contractAddress: string
  etherscanUrl: string
}

export const unlockConfigs: { [key in 'dev' | 'prod']: UnlockConfig } = {
  dev: {
    networkName: 'sepolia',
    chainId: 11155111,
    contractAddress: '0xdbdd8b233bed095db975f2cd527a714c5fc7db62',
    etherscanUrl: 'https://sepolia.etherscan.io',
  },
  prod: {
    networkName: 'optimism',
    chainId: 10,
    contractAddress: '0x45accac0e5c953009cda713a3b722f87f2907f86',
    etherscanUrl: 'https://optimistic.etherscan.io',
  },
}

export const unlockConfigForEnv: UnlockConfig = getAppConfig(unlockConfigs)
