import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { AppHead } from '@/components/shared/head'
import theme from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import { NavigationProvider } from '@/components/contexts/NavigationContext'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { ErrorProvider } from '@/components/contexts/ErrorContext'
import { PrivyProvider } from '@privy-io/react-auth'
import { appDomainWithProto } from '@/utils/display-utils'
import { wagmiChainConfig } from '@/lib/chains'
import { useAuth } from '@/components/hooks/useAuth'
import { Reload } from '@/components/auth/Reload'
import { Analytics } from '@vercel/analytics/react'
import { BackendProvider } from '@/components/contexts/BackendContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@privy-io/wagmi'

export default function App({ Component, pageProps }: AppProps) {
  const { handleLogin } = useAuth()
  const queryClient = new QueryClient()

  return (
    <>
      <AppHead />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
          onSuccess={handleLogin}
          config={{
            loginMethods: ['email', 'wallet'],
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
            walletConnectCloudProjectId:
              process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
            appearance: {
              theme: theme.colors.yellow100 as `#${string}`,
              accentColor: theme.colors.green800 as `#${string}`,
              logo: `${appDomainWithProto}/images/cabin-auth.png`,
              showWalletLoginFirst: true,
              walletList: [
                'detected_wallets',
                'metamask',
                'coinbase_wallet',
                'rainbow',
                'wallet_connect',
              ],
            },
          }}
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
      </ThemeProvider>
    </>
  )
}
