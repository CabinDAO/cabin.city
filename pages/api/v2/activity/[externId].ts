import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { ActivityDeleteResponse } from '@/utils/types/activity'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityDeleteResponse>,
  opts: { auth: AuthData }
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)
  const externId = req.query.externId as string

  const activityToDelete = await prisma.activity.findUnique({
    where: {
      externId: externId,
    },
  })

  if (!activityToDelete) {
    res.status(404).send({ error: 'Activity not found' })
    return
  }

  if (activityToDelete.profileId !== profile.id && !profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  await prisma.activity.delete({ where: { id: activityToDelete.id } })

  res.status(200).send({ deleted: true })
}

export default withAuth(handler)
