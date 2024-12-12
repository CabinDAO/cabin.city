import { z } from 'zod'
import { APIError } from '@/utils/types/shared'

export const CURRENT_CLAIMABLE_STAMP: { id: number; name: string } | null = null
// {
//   id: 48,
//   name: 'Network State Conf 2024',
// }

export const StampClaimParams = z
  .object({
    id: z.number(),
  })
  .strict()
export type StampClaimParamsType = z.infer<typeof StampClaimParams>

export type StampClaimResponse =
  | { success: boolean; previouslyClaimed: boolean }
  | APIError

export type StampListResponse =
  | {
      stamps: {
        id: number
        name: string
      }[]
    }
  | APIError

export const StampGrantParams = z
  .object({
    id: z.number(),
    profileExternId: z.string(),
  })
  .strict()
export type StampGrantParamsType = z.infer<typeof StampGrantParams>

export type StampGrantResponse =
  | { success: boolean; previouslyClaimed: boolean }
  | APIError
