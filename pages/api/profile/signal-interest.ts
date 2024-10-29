import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { ActivityType, CitizenshipStatus } from '@prisma/client'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
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

  const user = await requireUser(opts.auth)
  if (user.citizenshipStatus !== null) {
    res.status(400).send({ error: 'Interest already signaled' })
    return
  }

  await prisma.profile.update({
    where: {
      id: user.id,
      citizenshipStatus: null,
    },
    data: {
      citizenshipStatus: CitizenshipStatus.VouchRequested,
    },
  })

  const activityKey = `VouchRequested|${user.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.VouchRequested,
      profileId: user.id,
    },
    update: {},
  })

  res.status(200).send({})
}

export default wrapHandler(handler)
