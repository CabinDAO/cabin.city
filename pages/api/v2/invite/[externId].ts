import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/utils/api/withAuth'
import { InviteResponse } from '@/utils/types/partialInviteClaim'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InviteResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  console.log(
    'WE ARE HERE WE ARE HERE WE ARE HERE WE ARE HERE WE ARE HERE WE ARE HERE '
  )

  const invite = await prisma.partialInviteClaim.findUnique({
    where: { externId: req.query.externId as string },
  })

  if (!invite) {
    res.status(404).send({ error: 'Invite claim not found' })
    return
  }

  res.status(200).send({
    externId: invite.externId,
    name: invite.name,
    email: invite.email,
  })
}

export default withAuth(handler)
