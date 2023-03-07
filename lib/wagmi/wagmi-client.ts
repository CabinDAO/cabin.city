import { configureChains, goerli, mainnet } from '@wagmi/core'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { polygon, polygonMumbai } from '@wagmi/chains'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

const chains =
  process.env.NEXT_PUBLIC_USE_TESTNETS === 'true'
    ? [polygonMumbai, goerli]
    : [mainnet, polygon]

const { provider, webSocketProvider } = configureChains(
  [...chains],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_ID }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID }),

    // We could use the public default one for the networks without too much traffic?
    publicProvider(),
  ]
)

export const wagmiClient = createClient(
  getDefaultClient({
    appName: process.env.NEXT_PUBLIC_ALCHEMY_APP_NAME,
    provider,
    chains,
    webSocketProvider,
  })
)
