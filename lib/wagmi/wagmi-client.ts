import { configureChains, goerli } from '@wagmi/core'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { optimism } from '@wagmi/chains'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

const chains =
  process.env.NEXT_PUBLIC_USE_TESTNETS === 'true' ? [goerli] : [optimism]

const apiKey =
  process.env.NEXT_PUBLIC_USE_TESTNETS === 'true'
    ? process.env.NEXT_PUBLIC_ETH_ALCHEMY_ID
    : process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID

const { provider, webSocketProvider } = configureChains(
  [...chains],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [
    alchemyProvider({ apiKey }),

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
