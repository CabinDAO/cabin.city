import { APIError } from '@/utils/types/shared'
import { z } from 'zod'

export const WalletGenerateParams = z
  .object({
    profileExternId: z.string(),
  })
  .strict()
export type WalletGenerateParamsType = z.infer<typeof WalletGenerateParams>

export type WalletGenerateResponse =
  | {
      address: string
    }
  | APIError
