import { z } from 'zod'
import { APIError } from '@/utils/types/shared'

export const CURRENT_CLAIMABLE_STAMP: { id: number; name: string } | null = {
  id: 48,
  name: 'Network State Conf 2024',
}

export const StampClaimParams = z
  .object({
    id: z.number(),
  })
  .strict()
export type StampClaimParamsType = z.infer<typeof StampClaimParams>

export type StampClaimResponse =
  | { success: boolean; previouslyClaimed: boolean }
  | APIError
