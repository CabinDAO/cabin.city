import { APIError } from '@/utils/types/shared'

export enum PaymentMethod {
  Crypto = 'Crypto',
  CreditCard = 'CreditCard',
}

export type InviteClaimParams = {
  inviteCode: string
  name: string
  email: string
  walletAddressOrENS: string
  paymentMethod: PaymentMethod
}

export type InviteClaimResponse =
  | {
      externId: string
      cartId?: string
    }
  | APIError

export type InviteResponse =
  | {
      externId: string
      name: string
      email: string
    }
  | APIError
