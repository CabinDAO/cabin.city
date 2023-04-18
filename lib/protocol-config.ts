import { BigNumber } from 'ethers'

interface HatsConfig {
  networkName: string
  contractAddress: string
  subgraphUrl: string
  initialBlock: BigNumber
  treeId: string
}

export const hatsConfig: HatsConfig = getConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0x9D2dfd6066d5935267291718E8AA16C8Ab729E9d',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-protocol-v1-goerli',
    treeId: '0x00000002',
    initialBlock: BigNumber.from('8752122'),
  },
  prod: {
    networkName: 'optimism',
    contractAddress: '0x9D2dfd6066d5935267291718E8AA16C8Ab729E9d',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-protocol-v1-optimism',
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

export const otterspaceConfig: OtterspaceConfig = getConfig({
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

export const cabinTokenConfig: CabinTokenConfig = getConfig({
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
}
export const unlockConfig: UnlockConfig = getConfig({
  dev: {
    networkName: 'goerli',
    chainId: 5,
    contractAddress: '0xAAae475e2e1D92Ffd4a103A72FDc9f5301896e28',
  },
  prod: {
    networkName: 'optimism',
    chainId: 10,
    contractAddress: '0x45aCCac0E5C953009cDa713a3b722F87F2907F86',
  },
})

interface GetConfigArgs<T> extends Record<string, T> {
  dev: T
  prod: T
}

function getConfig<T>(args: GetConfigArgs<T>): T {
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
