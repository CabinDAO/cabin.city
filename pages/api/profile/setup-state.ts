import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import {
  ProfileSetupStateParams,
  ProfileSetupStateResponse,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileSetupStateResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const user = await requireUser(opts.auth)

  if (!req.body.state) {
    res.status(400).send({ error: 'State var required' })
    return
  }

  const params: ProfileSetupStateParams = {
    state: req.body.state as ProfileSetupStateParams['state'],
  }

  await prisma.profile.update({
    data: {
      isProfileSetupFinished: params.state === 'finished' ? true : undefined,
      isProfileSetupDismissed: params.state === 'dismissed' ? true : undefined,
    },
    where: {
      id: user.id,
    },
  })

  res.status(200).send({
    success: true,
  })
}

export default wrapHandler(handler)
