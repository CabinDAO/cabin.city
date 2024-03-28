import { createContext, ReactNode, useContext, useState } from 'react'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import theme from '@/styles/theme'
import { isProd } from '@/utils/dev'
import { appDomainWithProto } from '@/utils/display-utils'

type PrivyConfigContextType = {
  privyConfig: PrivyClientConfig
  setPrivyConfig: (config: PrivyClientConfig) => void
  setShowWalletLoginFirst: (val: boolean) => void
}

const defaultConfig: PrivyClientConfig = {
  loginMethods: ['email', 'wallet'],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
  },
  walletConnectCloudProjectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  appearance: {
    theme: theme.colors.yellow100 as `#${string}`,
    accentColor: theme.colors.green800 as `#${string}`,
    logo: isProd
      ? `${appDomainWithProto}/images/cabin-auth.png`
      : `${appDomainWithProto}/images/cabin-auth-dev.png`,
    showWalletLoginFirst: true,
    walletList: [
      'detected_wallets',
      'metamask',
      'coinbase_wallet',
      'rainbow',
      'wallet_connect',
    ],
  },

  // mfa: {
  //   noPromptOnMfaRequired: false,
  // },

  // what does this do? I copied it from https://github.com/privy-io/auth-demo/blob/main/lib/hooks/usePrivyConfig.ts
  // //@ts-expect-error internal api
  // _render: {
  //   inDialog: false,
  //   inParentNodeId: 'render-privy',
  // },
}

const context = createContext<PrivyConfigContextType | null>(null)

export const PrivyConfigProvider = ({ children }: { children: ReactNode }) => {
  const [privyConfig, setPrivyConfig] =
    useState<PrivyConfigContextType['privyConfig']>(defaultConfig)

  const setShowWalletLoginFirst = (val: boolean) => {
    return setPrivyConfig((prevConfig) => ({
      ...prevConfig,
      appearance: { ...prevConfig.appearance, showWalletLoginFirst: val },
    }))
  }

  const hookValue = { privyConfig, setPrivyConfig, setShowWalletLoginFirst }

  return <context.Provider value={hookValue}>{children}</context.Provider>
}

export const usePrivyConfig = () => {
  const c = useContext(context)
  if (!c) {
    throw new Error(
      'usePrivyConfig must be used within BackendContext. Wrap a parent component in <PrivyConfigContext.Provider> to fix this error.'
    )
  }
  return c
}
