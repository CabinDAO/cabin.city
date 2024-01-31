import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import withProfile, { ProfileWithWallet } from '@/utils/api/withProfile'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

import {
  CitizenshipStatus,
  ProfileListResponse,
  ProfileVouchParams,
  ProfileVouchResponse,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: { profile: ProfileWithWallet } }
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (!req.body.action) {
    res.status(400).send({ error: 'Action required' })
    return
  }

  const profile = opts.auth.profile

  const params: ProfileVouchParams = {
    externId: req.body.externId ? (req.body.externId as string) : '',
    action: req.body.action as ProfileVouchParams['action'],
  }

  try {
    const vouchedProfile = await prisma.profile.update({
      data: {
        voucherId: params.action === 'vouch' ? profile.id : null,
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
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientValidationError) {
      res.status(200).send({
        profiles: [],
        count: 0,
        error: `PrismaClientValidationError: ${e.message}`,
      } as ProfileListResponse)
    } else {
      res.status(200).send({
        profiles: [],
        count: 0,
        error: e as string,
      } as ProfileListResponse)
    }
  }
}

export default withProfile(handler)
