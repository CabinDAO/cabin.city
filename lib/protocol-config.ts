interface HatsConfig {
  networkName: string
  contractAddress: string
  subgraphUrl: string
}

export const hatsConfig: HatsConfig = getConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0xcf912a0193593f5cd55d81ff611c26c3ed63f924',
    subgraphUrl:
      'https://thegraph.com/hosted-service/subgraph/hats-protocol/hats-protocol-goerli-beta6',
  },
  prod: {
    networkName: 'matic',
    contractAddress: '0x95647f88dcbc12986046fc4f49064edd11a25d38',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-protocol-polygon-beta6',
  },
})

interface OtterspaceConfig {
  networkName: string
  contractAddress: string
  subgraphUrl: string
}

export const otterspaceConfig: OtterspaceConfig = getConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0xa6773847d3D2c8012C9cF62818b320eE278Ff722',
    subgraphUrl:
      'https://thegraph.com/hosted-service/subgraph/otterspace-xyz/badges-goerli',
  },
  prod: {
    networkName: 'optimism',
    contractAddress: '0x7F9279B24D1c36Fa3E517041fdb4E8788dc63D25',
    subgraphUrl:
      'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
  },
})

interface CabinTokenConfig {
  networkName: string
  contractAddress: string
}

export const cabinTokenConfig: CabinTokenConfig = getConfig({
  dev: {
    networkName: 'goerli',
    contractAddress: '0x096ea5c03c3643f48d7ae0bac629bae5a8645f2e',
  },
  prod: {
    networkName: 'mainnet',
    contractAddress: '0x1934e252f840aa98dfce2b6205b3e45c41aef830',
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
