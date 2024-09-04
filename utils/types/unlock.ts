import { z } from 'zod'
import { WalletAddress } from '@/utils/types/profile'
import { APIError } from '@/utils/types/shared'

export const RefetchParams = z
  .object({
    address: WalletAddress,
  })
  .strict()
export type RefetchParamsType = z.infer<typeof RefetchParams>

export type RefetchResponse =
  | {
      updated: boolean
    }
  | APIError
