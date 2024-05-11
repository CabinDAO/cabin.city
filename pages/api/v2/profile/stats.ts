import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/utils/api/withAuth'
import { ProfileStatsResponse } from '@/utils/types/profile'
import { PublicLock__factory } from '@/generated/ethers'
import { unlockConfigForEnv } from '@/lib/protocol-config'
import { getEthersAlchemyProvider } from '@/lib/chains'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileStatsResponse>
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const lockContract = PublicLock__factory.connect(
    unlockConfigForEnv.contractAddress,
    getEthersAlchemyProvider(unlockConfigForEnv.networkName)
  )

  const [profiles, citizens] = await Promise.all([
    prisma.profile.count(),
    lockContract.totalSupply(),
  ])

  res.status(200).send({
    profiles: profiles,
    citizens: Number(citizens),
  })
}
