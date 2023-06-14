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
import { NavigationProvider } from '@/components/contexts/NavigationContext'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { ErrorProvider } from '@/components/contexts/ErrorContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <ErrorProvider>
              <ApolloProvider client={apolloClient}>
                <CitizenshipProvider>
                  <NavigationProvider>
                    <ModalProvider>
                      <GoogleAnalytics />
                      <Component {...pageProps} />
                    </ModalProvider>
                  </NavigationProvider>
                </CitizenshipProvider>
              </ApolloProvider>
            </ErrorProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
