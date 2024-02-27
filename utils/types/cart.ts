import { APIError } from '@/utils/types/shared'

export type CartNewResponse =
  | {
      externId: string
    }
  | APIError

// must match prisma's $Enums.PaymentStatus
export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Error = 'Error',
}

export type CartFragment = {
  externId: string
  amount: number
  paymentStatus: PaymentStatus
  accountSetupStatus?: {
    existingAccount: boolean
    hasWallet: boolean
    providedEmailDomain: string | undefined
    privyAccountExists: boolean
    localProfileExists: boolean
    profileExternId: string
    grantTxSent: boolean
    grantTxConfirmed: boolean
    error: string
  }
}

export type CartResponse = CartFragment | APIError
