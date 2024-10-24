import { APIError } from '@/utils/types/shared'
import { z } from 'zod'

export const MessageNewParams = z
  .object({
    recipientExternId: z.string(),
    text: z.string(),
  })
  .strict()
export type MessageNewParamsType = z.infer<typeof MessageNewParams>

export type MessageNewResponse =
  | {
      success: true
    }
  | APIError
