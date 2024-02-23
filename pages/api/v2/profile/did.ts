import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'
import { ProfileDIDResponse } from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileDIDResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await prisma.profile.findUnique({
    where: {
      privyDID: req.query.did as string,
    },
  })

  res.status(200).send({ externId: profile?.externId || null })
}

export default withAuth(handler)
