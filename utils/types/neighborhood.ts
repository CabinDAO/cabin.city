// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import { APIError, Paginated } from '@/utils/types/shared'

export type NeighborhoodFragment = {
  createdAt: string
  externId: string
  name: string
  lat: number
  lng: number
}

export type NeighborhoodListParams = {
  lat: number
  lng: number
  page?: number
}

export type NeighborhoodListResponse =
  | {
      neighborhoods: NeighborhoodFragment[]
    }
  | APIError

// must match NeighborhoodQueryInclude below
export type NeighborhoodWithRelations = Prisma.NeighborhoodGetPayload<{}>

// must match NeighborhoodWithRelations type above
export const NeighborhoodQueryInclude = {} satisfies Prisma.NeighborhoodInclude
