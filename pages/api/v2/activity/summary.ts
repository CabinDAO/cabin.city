import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { CitizenshipStatus } from '@prisma/client'
import { ActivitySummaryResponse } from '@/utils/types/activity'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivitySummaryResponse>
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profilesCount = await prisma.profile.count()
  const tokenHoldersCount = await prisma.wallet.count({
    where: {
      cabinTokenBalance: {
        gt: 0,
      },
    },
  })
  const citizensCount = await prisma.profile.count({
    where: {
      citizenshipStatus: CitizenshipStatus.Verified,
    },
  })

  res.status(200).send({
    profilesCount,
    tokenHoldersCount,
    citizensCount,
  })
}

export default handler
