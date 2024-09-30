import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { AppHead } from '@/components/head'
import theme from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import { NavigationProvider } from '@/components/contexts/NavigationContext'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { ErrorProvider } from '@/components/contexts/ErrorContext'
import { PrivyProvider } from '@privy-io/react-auth'
import { wagmiChainConfig } from '@/lib/chains'
import { Reload } from '@/components/auth/Reload'
import { Analytics } from '@vercel/analytics/react'
import { BackendProvider } from '@/components/hooks/useBackend'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@privy-io/wagmi'
import {
  PrivyConfigProvider,
  usePrivyConfig,
} from '@/components/hooks/usePrivyConfig'

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
            </BackendProvider>
          </ErrorProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
