type EnvDict = {
  [P in keyof Env]: Env[P] extends number | boolean ? string : Env[P]
}

export interface Env {
  NEXT_PUBLIC_ALCHEMY_APP_NAME: string
  NEXT_PUBLIC_FAUNA_CLIENT_KEY: string
  IRON_SESSION_PASSWORD: string
  NEXT_PUBLIC_ETH_ALCHEMY_ID: string
  NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  NEXT_PUBLIC_USE_TESTNETS: boolean
  NEXT_PUBLIC_VERCEL_URL: string
  SIGNER_PRIVATE_KEY: string
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends EnvDict {}
  }

  interface Window {
    unlockProtocol: {
      loadCheckoutModal: (config?: unknown) => void
    }
    initMap: () => void
  }
}

export {}
