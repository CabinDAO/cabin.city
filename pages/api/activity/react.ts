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

  if (params.action === 'like') {
    // await Promise.all() might be even better here because its parallel, while transaction is sequential
    await prisma.activityReaction.create({
      data: {
        activity: {
          connect: {
            externId: params.externId,
          },
        },
        profile: {
          connect: {
            externId: user.externId,
          },
        },
      },
    })
  } else {
    const activity = await prisma.activity.findUnique({
      where: {
        externId: params.externId,
      },
    })
    if (activity) {
      await prisma.activityReaction.delete({
        where: {
          profileId_activityId: {
            profileId: user.id,
            activityId: activity.id,
          },
        },
      })
    }
  }

  res.status(200).send({
    reacted: true,
  })
}

export default wrapHandler(handler)
