import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiChainConfig } from '@/lib/chains'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { SnapshotProvider } from '@/components/contexts/SnapshotContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { NavigationProvider } from '@/components/contexts/NavigationContext'
import { ErrorProvider } from '@/components/contexts/ErrorContext'
import { BackendProvider } from '@/components/hooks/useBackend'
import {
  PrivyConfigProvider,
  usePrivyConfig,
} from '@/components/hooks/usePrivyConfig'
import { AppHead } from '@/components/head'
import theme from '@/styles/theme'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { Reload } from '@/components/auth/Reload'

export default function App(props: AppProps) {
  return (
    <>
      <AppHead />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <PrivyConfigProvider>
          <RestOfAppWithPrivyConfig {...props} />
        </PrivyConfigProvider>
      </ThemeProvider>
    </>
  )
}

const RestOfAppWithPrivyConfig = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient()
  const { privyConfig } = usePrivyConfig()

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiChainConfig}>
          <ErrorProvider>
            <BackendProvider>
              <SnapshotProvider>
                <ModalProvider>
                  <CitizenshipProvider>
                    <NavigationProvider>
                      <GoogleAnalytics />
                      <Reload />
                      <Component {...pageProps} />
                      <Analytics />
                    </NavigationProvider>
                  </CitizenshipProvider>
                </ModalProvider>
              </SnapshotProvider>
            </BackendProvider>
          </ErrorProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
