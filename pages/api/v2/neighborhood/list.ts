import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  NeighborhoodFragment,
  NeighborhoodListParams,
  NeighborhoodListResponse,
  NeighborhoodQueryInclude,
  NeighborhoodWithRelations,
} from '@/utils/types/neighborhood'
import { toErrorString } from '@/utils/api/error'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NeighborhoodListResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = NeighborhoodListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const idsInOrder = await sortByDistancePrequery(
    params.lat,
    params.lng,
    params.maxDistance
  )

  const query: Prisma.NeighborhoodFindManyArgs = {
    where: { id: { in: idsInOrder } },
    include: NeighborhoodQueryInclude,
  }

  const neighborhoods = await prisma.neighborhood.findMany(query)

  const sorted = neighborhoods.sort((a, b) => {
    return idsInOrder.indexOf(a.id) - idsInOrder.indexOf(b.id)
  })

  res.status(200).send({
    neighborhoods: sorted.map((n) =>
      neighborhoodToFragment(n as NeighborhoodWithRelations)
    ),
  })
}

async function sortByDistancePrequery(
  lat: number,
  lng: number,
  maxDistance?: number
) {
  const rows = await prisma.$queryRaw<{ id: number; distance_in_km: number }[]>`
    SELECT n.id, (6371 * 2 * ASIN(SQRT(
      POWER(SIN((radians(n.lat) - radians(${lat})) / 2), 2) +
      COS(radians(${lat})) * COS(radians(n.lat)) *
      POWER(SIN((radians(n.lng) - radians(${lng})) / 2), 2)
    ))) AS distance_in_km
    FROM "Neighborhood" n
    ORDER BY distance_in_km ASC, n.name ASC, n."createdAt" ASC
    LIMIT 5
  `

  return rows
    .filter((row) => !maxDistance || row.distance_in_km <= maxDistance)
    .reduce((ids: number[], row) => [...ids, row.id], [])
}

function neighborhoodToFragment(
  n: NeighborhoodWithRelations
): NeighborhoodFragment {
  return {
    createdAt: n.createdAt.toISOString(),
    externId: n.externId,
    name: n.name,
    lat: n.lat,
    lng: n.lng,
  }
}
