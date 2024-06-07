import fetch from 'node-fetch'
import { PrivyClient, LinkedAccountWithMetadata } from '@privy-io/server-auth'

export const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID || '',
  process.env.PRIVY_APP_SECRET || ''
)

const PRIVY_REST_API_BASE = 'https://auth.privy.io/api/v1'

const credentials = Buffer.from(
  `${process.env.NEXT_PUBLIC_PRIVY_APP_ID}:${process.env.PRIVY_APP_SECRET}`,
  'utf-8'
).toString('base64')

export const privyAPICall = async (
  method: string,
  path: string,
  body: object = {}
) => {
  const privyAppID = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  if (!privyAppID) {
    throw new Error('Missing NEXT_PUBLIC_PRIVY_APP_ID env var')
  }

  return await fetch(`${PRIVY_REST_API_BASE}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
      'privy-app-id': privyAppID,
    },
    ...(method === 'POST' && { body: JSON.stringify(body) }),
  })
}

/**
 * NOTE: if you use just the email and ask it to generate an embedded wallet,
 * it will return the previously-generated wallet address if it exists. But if
 * you pass that wallet address as the second param, it will tell you there's
 * a conflict with an existing user.
 *
 * If you have an existing user with an email and you later want to generate a wallet,
 * you can use this to do that and it will not conflict.
 *
 * NOTE: we're using this instead of PrivyClient because it is bad at surfacing
 * errors (eg when you create a user with an email that already exists).
 * Hope they fix this someday...
 */
export const createPrivyAccount = async (email: string, walletAddress = '') => {
  const linkedAccounts: {
    type: string
    address: string
    chain_type?: string
  }[] = [
    {
      type: 'email',
      address: email,
    },
  ]

  if (walletAddress) {
    linkedAccounts.push({
      type: 'wallet',
      address: walletAddress,
      chain_type: 'ethereum', // 'ethereum' is the only valid one atm
    })
  }

  const res = await privyAPICall('POST', 'users', {
    create_embedded_wallet: !walletAddress,
    linked_accounts: linkedAccounts,
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`${error.error}, cause: ${error.cause}`)
  }

  return (await res.json()) as CreateAccountResponse
}

// this doesnt work today and the client gives an unhelpful error message so
// its impossible to debug
const createPrivyAccountMightWorkSomeday = async (
  email: string,
  walletAddress = ''
) => {
  const linkedAccounts: Array<
    DistributiveOmit<LinkedAccountWithMetadata, 'verifiedAt'>
  > = [
    {
      type: 'email',
      address: email,
    },
  ]

  if (walletAddress) {
    linkedAccounts.push({
      type: 'wallet',
      address: walletAddress,
      chainType: 'ethereum', // why is this still required???
      chainId: 'eip155:1', // eth mainnet
    })
  }

  return await privy.importUser({
    createEmbeddedWallet: !walletAddress,
    linkedAccounts: linkedAccounts,
  })
}

type CreateAccountResponse = {
  id: string // did:privy:abc123
  created_at: number // timestamp
  linked_accounts: LinkedAccount[]
  mfa_methods: unknown[]
  has_accepted_terms: boolean
}

type LinkedAccount = {
  type: string
  verified_at: number
} & (
  | {
      type: 'email'
      address: string
    }
  | {
      type: 'wallet'
      address: string
      wallet_index: number
      /**
       * CAIP-2 formatted chain ID during the most recent verification.
       *
       * e.g. eip155:1, eip155:5, eip155:137, etc.
       */
      chain_id: string
      /**
       * The wallet client used for this wallet during the most recent verification.
       *
       * If the value is `privy`, then this is a privy embedded wallet.
       *
       * Other values include but are not limited to `metamask`, `rainbow`, `coinbase_wallet`, etc.
       */
      wallet_client_type: string
      /**
       * The connector type used for this wallet during the most recent verification.
       *
       * This includes but is not limited to `injected`, `wallet_connect`, `coinbase_wallet`, `embedded`.
       */
      connector_type: string
      /**
       * If this is a 'privy' embedded wallet, stores the recovery method:
       *
       *     1. 'privy': privy escrow of the recovery material
       *     2. 'user-passcode': recovery protected by user-input passcode
       */
      recovery_method: 'privy' | 'user-passcode'
    }
)

// copied from @privy-io/server-auth because its not exported
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never
