import { configureChains } from '@wagmi/core'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { optimism, goerli } from '@wagmi/chains'

const chains =
  process.env.NEXT_PUBLIC_USE_TESTNETS === 'true' ? [goerli] : [optimism]

const apiKey =
  process.env.NEXT_PUBLIC_USE_TESTNETS === 'true'
    ? process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
    : process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID

export const configureChainsConfig = configureChains(
  [...chains],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [
    alchemyProvider({ apiKey }),

    // We could use the public default one for the networks without too much traffic?
    publicProvider(),
  ]
)

export const appChain = configureChainsConfig.chains[0]
