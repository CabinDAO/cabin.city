import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'
import { randomId } from '@/utils/random'
import { LocationNewResponse } from '@/utils/types/location'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const location = await prisma.location.create({
    data: {
      stewardId: profile.id,
      externId: randomId('location'),
      type: $Enums.LocationType.Neighborhood,
      name: 'New neighborhood',
      tagline: '',
      description: '',
      bannerImageIpfsHash: '',
    },
  })

  res
    .status(200)
    .send({ locationExternId: location.externId } as LocationNewResponse)
}

export default withAuth(handler)
