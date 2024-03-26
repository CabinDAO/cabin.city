// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { APIError } from '@/utils/types/shared'

export type NeighborhoodFragment = {
  createdAt: string
  externId: string
  name: string
  lat: number
  lng: number
}

export const NeighborhoodListParams = z
  .object({
    lat: z.string().transform((x) => parseFloat(x)),
    lng: z.string().transform((x) => parseFloat(x)),
    maxDistance: z
      .string({ description: 'max distance in km' })
      .optional()
      .transform((x) => (x ? parseInt(x) : undefined)),
  })
  .strict()

export type NeighborhoodListParamsType = z.infer<typeof NeighborhoodListParams>

export type NeighborhoodListResponse =
  | {
      neighborhoods: NeighborhoodFragment[]
    }
  | APIError

// must match NeighborhoodQueryInclude below
export type NeighborhoodWithRelations = Prisma.NeighborhoodGetPayload<{}>

// must match NeighborhoodWithRelations type above
export const NeighborhoodQueryInclude = {} satisfies Prisma.NeighborhoodInclude
