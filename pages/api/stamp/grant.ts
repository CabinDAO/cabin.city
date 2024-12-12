import type { NextApiRequest, NextApiResponse } from 'next'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import { StampGrantParams, StampGrantResponse } from '@/utils/types/stamp'
import { toErrorString } from '@/utils/api/error'
import { addStamp } from '@/utils/profile'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StampGrantResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const user = await requireUser(opts.auth)
  if (!user.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  const parsed = StampGrantParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const profile = await prisma.profile.findUnique({
    where: { externId: params.profileExternId },
  })
  if (!profile) {
    res.status(400).send({ error: 'Profile not found' })
    return
  }

  const stamp = await prisma.stamp.findUnique({
    where: { id: params.id },
    include: { profiles: { where: { profileId: profile.id } } },
  })

  if (!stamp) {
    res.status(400).send({ error: 'Stamp not found' })
    return
  } else if (stamp.profiles.length > 0) {
    res.status(400).send({ success: true, previouslyClaimed: true })
    return
  }

  await addStamp(profile, stamp.id)

  res.status(200).send({ success: true, previouslyClaimed: false })
}
