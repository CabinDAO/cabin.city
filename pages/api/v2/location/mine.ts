import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  LocationMineResponse,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { locationToFragment } from '@/pages/api/v2/location/list'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationMineResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }
  const profile = await requireProfile(req, res, opts)

  const query: Prisma.LocationFindManyArgs = {
    where: {
      steward: {
        privyDID: profile.privyDID,
      },
    },
    include: LocationQueryInclude(),
    orderBy: {
      name: 'asc',
    },
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [locations, count] = await prisma.$transaction([
    prisma.location.findMany(query),
    prisma.location.count({ where: query.where }),
  ])

  return res.status(200).send({
    locations: locations.map((location) =>
      locationToFragment(location as LocationWithRelations)
    ),
    count,
  })
}

export default withAuth(handler)
