import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import { $Enums } from '@prisma/client'

export type ActivitySummaryResponse = {
  profilesCount: number
  tokenHoldersCount: number
  citizensCount: number
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      citizenshipStatus: $Enums.CitizenshipStatus.Verified,
    },
  })

  res.status(200).send({
    profilesCount,
    tokenHoldersCount,
    citizensCount,
  } as ActivitySummaryResponse)
}

export default handler
