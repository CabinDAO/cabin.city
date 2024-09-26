import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import {
  CitizenshipStatus,
  ProfileVouchParams,
  ProfileVouchResponse,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileVouchResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (!req.body.action) {
    res.status(400).send({ error: 'Action required' })
    return
  }

  const profile = await requireProfile(opts.auth)

  const params: ProfileVouchParams = {
    externId: req.body.externId ? (req.body.externId as string) : '',
    action: req.body.action as ProfileVouchParams['action'],
  }

  const vouchedProfile = await prisma.profile.update({
    data: {
      voucherId: params.action === 'vouch' ? profile.id : null,
      citizenshipStatus:
        params.action === 'vouch'
          ? CitizenshipStatus.Vouched
          : CitizenshipStatus.VouchRequested,
    },
    where: {
      externId: params.externId,
      voucherId: params.action === 'vouch' ? null : profile.id,
    },
    select: {
      citizenshipStatus: true,
      _count: true,
    },
  })

  res.status(200).send({
    newStatus: vouchedProfile.citizenshipStatus as CitizenshipStatus,
  })
}

export default wrapHandler(handler)
