import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { apolloClient } from '@/lib/apollo/apollo-client'
import { wagmiClient } from '@/lib/wagmi/wagmi-client'
import theme from '@/styles/theme'
import { ApolloProvider } from '@apollo/client'
import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import GlobalStyles from '../styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cabin Census</title>
        <meta
          name="description"
          content="Cabin encourages coliving in nature for creators and remote workers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
