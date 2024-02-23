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
  partialInviteClaimExternId: string
}

export type CartResponse = CartFragment | APIError
