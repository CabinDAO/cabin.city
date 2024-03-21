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

export const NeighborhoodListParamsSchema = z.object({
  lat: z.string().transform((x) => parseFloat(x)),
  lng: z.string().transform((x) => parseFloat(x)),
})

export type NeighborhoodListParams = z.infer<
  typeof NeighborhoodListParamsSchema
>

export type NeighborhoodListResponse =
  | {
      neighborhoods: NeighborhoodFragment[]
    }
  | APIError

// must match NeighborhoodQueryInclude below
export type NeighborhoodWithRelations = Prisma.NeighborhoodGetPayload<{}>

// must match NeighborhoodWithRelations type above
export const NeighborhoodQueryInclude = {} satisfies Prisma.NeighborhoodInclude
