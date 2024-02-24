import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import {
  CitizenshipStatus,
  ProfileVouchParams,
  ProfileVouchResponse,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (!req.body.action) {
    res.status(400).send({ error: 'Action required' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const params: ProfileVouchParams = {
    externId: req.body.externId ? (req.body.externId as string) : '',
    action: req.body.action as ProfileVouchParams['action'],
  }

  const vouchedProfile = await prisma.profile.update({
    data: {
      voucherId: params.action === 'vouch' ? profile.id : null,
      citizenshipStatus:
        params.action === 'vouch' ? 'Vouched' : 'VouchRequested',
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

  console.log(vouchedProfile)

  res.status(200).send({
    newStatus: vouchedProfile.citizenshipStatus as CitizenshipStatus,
  } as ProfileVouchResponse)
}

export default withAuth(handler)
