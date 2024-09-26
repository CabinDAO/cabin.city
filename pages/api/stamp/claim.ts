import type { NextApiRequest, NextApiResponse } from 'next'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import {
  CURRENT_CLAIMABLE_STAMP,
  StampClaimParams,
  StampClaimResponse,
} from '@/utils/types/stamp'
import { toErrorString } from '@/utils/api/error'
import { addStamp } from '@/utils/profile'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StampClaimResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = StampClaimParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const profile = await requireProfile(opts.auth)

  const claimableStamps = [CURRENT_CLAIMABLE_STAMP?.id]
  if (!claimableStamps.includes(params.id)) {
    res.status(400).send({ error: 'Cannot claim this stamp' })
    return
  }

  const stamp = await prisma.stamp.findUnique({
    where: {
      id: params.id,
    },
    include: {
      profiles: {
        where: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!stamp) {
    res.status(400).send({ error: 'Cannot claim this stamp' })
    return
  }

  if (stamp.profiles.length > 0) {
    res.status(400).send({ success: true, previouslyClaimed: true })
  }

  await addStamp(profile, stamp.id)

  res.status(200).send({ success: true, previouslyClaimed: false })
}
