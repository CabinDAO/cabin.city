import type { NextApiRequest, NextApiResponse } from 'next'
import withProfile, { ProfileWithWallet } from '@/utils/api/withProfile'
import { prisma } from '@/utils/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import {
  ActivityReactParams,
  ActivityReactResponse,
} from '@/utils/types/activity'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: { profile: ProfileWithWallet } }
) {
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Method not allowed' })
    return
  }

  const params = req.body as ActivityReactParams

  if (!params.action) {
    res.status(400).send({ message: 'Action required' })
    return
  }

  const profile = opts.auth.profile

  try {
    if (params.action === 'like') {
      // await Promise.all() might be even better here because its parallel, while transaction is sequential
      const res = await prisma.activityReaction.create({
        data: {
          activity: {
            connect: {
              externId: params.externId,
            },
          },
          profile: {
            connect: {
              externId: profile.externId,
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
              profileId: profile.id,
              activityId: activity.id,
            },
          },
        })
      }
    }

    res.status(200).send({
      success: true,
    } as ActivityReactResponse)
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientValidationError) {
      res.status(200).send({
        success: false,
        error: `PrismaClientValidationError: ${e.message}`,
      } as ActivityReactResponse)
    } else {
      res.status(200).send({
        success: false,
        error: e as string,
      } as ActivityReactResponse)
    }
  }
}

export default withProfile(handler)
