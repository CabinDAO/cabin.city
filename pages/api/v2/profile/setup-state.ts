import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import withProfile, { ProfileWithWallet } from '@/utils/api/withProfile'

import {
  ProfileSetupStateParams,
  ProfileSetupStateResponse,
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

  if (!req.body.state) {
    res.status(400).send({ error: 'State var required' })
    return
  }

  const params: ProfileSetupStateParams = {
    state: req.body.state as ProfileSetupStateParams['state'],
  }

  try {
    await prisma.profile.update({
      data: {
        isProfileSetupFinished: params.state === 'finished' ? true : undefined,
        isProfileSetupDismissed:
          params.state === 'dismissed' ? true : undefined,
      },
      where: {
        id: opts.auth.profile.id,
      },
    })

    res.status(200).send({
      success: true,
    } as ProfileSetupStateResponse)
  } catch (e) {
    console.log(e)
    res.status(200).send({
      success: false,
      error: e as string,
    } as ProfileSetupStateResponse)
  }
}

export default withProfile(handler)
