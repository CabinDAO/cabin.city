import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  res.status(profile ? 200 : 404).send({ externId: profile?.externId })
}

export default withAuth(handler)
