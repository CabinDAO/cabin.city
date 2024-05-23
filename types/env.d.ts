type EnvDict = {
  [P in keyof Env]: Env[P] extends number | boolean ? string : Env[P]
}

export interface Env {
  NEXT_PUBLIC_ALCHEMY_APP_NAME: string
  POSTGRES_URL: string
  POSTGRES_URL_NON_POOLING: string
  IRON_SESSION_PASSWORD: string
  NEXT_PUBLIC_ETH_ALCHEMY_ID: string
  NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  NEXT_PUBLIC_VERCEL_URL: string
  NEXT_PUBLIC_IPFS_GATEWAY: string
  SIGNER_PRIVATE_KEY: string
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
  PINATA_API_JWT: string
  NEXT_PUBLIC_PINATA_API_KEY: string
  NEXT_PUBLIC_PINATA_API_SECRET: string
  NEXT_PUBLIC_PRIVY_PUBLIC_KEY: string
  NEXT_PUBLIC_PRIVY_APP_ID: string
  PRIVY_APP_SECRET: string
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  SENDGRID_API_KEY: string
  SENDGRID_FROM_EMAIL: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
  CONVERTKIT_API_KEY: string
  DISCORD_WEBHOOK_URL: string
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
    initMap: VoidFunction
  }
}

export {}
