import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'
import { LocationPublishResponse } from '@/utils/types/location'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationPublishResponse>,
  opts: { auth: AuthData }
) {
  if (req.method === 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const locationToPublish = await prisma.location.findUnique({
    where: {
      externId: req.query.externId as string,
    },
    include: {
      caretaker: true,
      mediaItems: true,
    },
  })

  if (!locationToPublish) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  if (locationToPublish.caretaker.id !== profile.id && !profile.isAdmin) {
    res
      .status(403)
      .send({ error: 'Only caretakers can publish their locations' })
    return
  }

  if (locationToPublish.publishedAt) {
    res.status(400).send({ error: 'Location already published' })
    return
  }

  const publishedLocation = await prisma.location.update({
    where: {
      id: locationToPublish.id,
    },
    data: {
      publishedAt: new Date(),
    },
  })

  res.status(200).send({
    publishedAt: publishedLocation?.publishedAt?.toISOString(),
  })
}

export default withAuth(handler)
