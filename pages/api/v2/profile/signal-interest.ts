import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { ActivityType, CitizenshipStatus } from '@prisma/client'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { randomId } from '@/utils/random'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)
  if (profile.citizenshipStatus !== null) {
    res.status(400).send({ error: 'Interest already signaled' })
    return
  }

  await prisma.profile.update({
    where: {
      id: profile.id,
      citizenshipStatus: null,
    },
    data: {
      citizenshipStatus: CitizenshipStatus.VouchRequested,
    },
  })

  const activityKey = `VouchRequested|${profile.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.VouchRequested,
      profileId: profile.id,
    },
    update: {},
  })

  res.status(200).send({})
}

export default withAuth(handler)
