import { CitizenshipProvider } from '@/components/contexts/CitizenshipContext'
import { ModalProvider } from '@/components/contexts/ModalContext'
import { AppHead } from '@/components/shared/head'
import { apolloClient } from '@/lib/apollo/apollo-client'
import theme from '@/styles/theme'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import { NavigationProvider } from '@/components/contexts/NavigationContext'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { ErrorProvider } from '@/components/contexts/ErrorContext'
import { PrivyProvider } from '@privy-io/react-auth'
import { appDomainWithProto } from '@/utils/display-utils'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChainsConfig } from '@/lib/wagmi/wagmi-client'
import { useAuth } from '@/components/hooks/useAuth'
import { Reload } from '@/components/auth/Reload'

export default function App({ Component, pageProps }: AppProps) {
  const { handleLogin } = useAuth()

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
              showWalletLoginFirst: false,
            },
          }}
        >
          <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
            <ErrorProvider>
              <ApolloProvider client={apolloClient}>
                <ModalProvider>
                  <CitizenshipProvider>
                    <NavigationProvider>
                      <GoogleAnalytics />
                      <Reload />
                      <Component {...pageProps} />
                    </NavigationProvider>
                  </CitizenshipProvider>
                </ModalProvider>
              </ApolloProvider>
            </ErrorProvider>
          </PrivyWagmiConnector>
        </PrivyProvider>
      </ThemeProvider>
    </>
  )
}
