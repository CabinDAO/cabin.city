import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  await prisma.profile.update({
    where: { id: profile.id },
    data: { gotSotn2024Badge: new Date() },
  })

  res.status(200).send({ success: true })
}
