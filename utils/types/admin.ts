import { z } from 'zod'

export enum AdminActions {
  fixTokenBalances = 'fixTokenBalances',
  sanitizeContacts = 'sanitizeContacts',
}

export const AdminParams = z
  .object({
    action: z.nativeEnum(AdminActions),
  })
  .strict()
export type AdminParamsType = z.infer<typeof AdminParams>
