import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { AppHead } from '@/components/shared/head'
import { apolloClient } from '@/lib/apollo/apollo-client'
import { wagmiClient } from '@/lib/wagmi/wagmi-client'
import theme from '@/styles/theme'
import { ApolloProvider } from '@apollo/client'
import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import GlobalStyles from '../styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppHead />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <ApolloProvider client={apolloClient}>
              <CitizenshipProvider>
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
              </CitizenshipProvider>
            </ApolloProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
