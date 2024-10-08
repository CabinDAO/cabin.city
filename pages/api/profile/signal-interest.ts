import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { ActivityType, CitizenshipStatus } from '@prisma/client'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { randomId } from '@/utils/random'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(opts.auth)
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

export default wrapHandler(handler)
