import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { StampListResponse } from '@/utils/types/stamp'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StampListResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const user = await requireUser(opts.auth)
  if (!user.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  const stamps = await prisma.stamp.findMany({
    orderBy: { id: 'asc' },
  })

  res.status(200).send({
    stamps: stamps.map((stamp) => ({
      id: stamp.id,
      name: stamp.name,
    })),
  })
}
