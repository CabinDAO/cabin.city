import type { NextApiRequest, NextApiResponse } from 'next'
import { OptsWithAuth, requireProfile, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { randomId } from '@/utils/random'
import { ActivityNewParams, ActivityNewResponse } from '@/utils/types/activity'
import { ActivityType } from '@prisma/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityNewResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const proflie = await requireProfile(opts.auth)
  const body = req.body as ActivityNewParams

  const activity = await prisma.activity.create({
    data: {
      externId: randomId('activity'),
      profileId: proflie.id,
      key: `Text|${Date.now()}`,
      type: ActivityType.Text,
      text: body.text,
    },
  })

  res.status(200).send({ externId: activity.externId })
}

export default withAuth(handler)
