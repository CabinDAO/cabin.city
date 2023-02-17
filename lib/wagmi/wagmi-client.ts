import { goerli, mainnet } from '@wagmi/core'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

export const wagmiClient = createClient(
  getDefaultClient({
    appName: process.env.NEXT_PUBLIC_ALCHEMY_APP_NAME,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: process.env.NEXT_PUBLIC_NETWORK_ID === '1' ? [mainnet] : [goerli],
  })
)
