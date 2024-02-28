import { APIError } from '@/utils/types/shared'

export enum PaymentMethod {
  Crypto = 'Crypto',
  CreditCard = 'CreditCard',
}

export type InviteClaimParams = {
  inviteCode: string
  paymentMethod: PaymentMethod
  newAccountParams: {
    name: string
    email: string
    walletAddressOrENS: string
  } | null
}

export type InviteClaimResponse =
  | {
      externId: string
      cartId?: string
    }
  | APIError
