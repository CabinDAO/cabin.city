import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  ActivityReactParams,
  ActivityReactResponse,
} from '@/utils/types/activity'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityReactResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const params = req.body as ActivityReactParams

  if (!params.action) {
    res.status(400).send({ error: 'Action required' })
    return
  }

  const user = await requireUser(opts.auth)
  const activity = await prisma.activity.findUnique({
    select: { id: true },
    where: { externId: params.externId },
  })
  if (!activity) {
    res.status(400).send({ error: 'Activity not found' })
    return
  }

  if (params.action === 'like') {
    await prisma.activityReaction.upsert({
      where: {
        profileId_activityId: {
          profileId: user.id,
          activityId: activity.id,
        },
      },
      create: {
        activity: { connect: { id: activity.id } },
        profile: { connect: { id: user.id } },
      },
      update: {},
    })
  } else {
    await prisma.activityReaction.delete({
      where: {
        profileId_activityId: {
          profileId: user.id,
          activityId: activity.id,
        },
      },
    })
  }

  res.status(200).send({
    reacted: true,
  })
}

export default wrapHandler(handler)
