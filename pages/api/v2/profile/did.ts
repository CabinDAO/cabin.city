import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { ProfileDIDParams, ProfileDIDResponse } from '@/utils/types/profile'
import { toErrorString } from '@/utils/api/error'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileDIDResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = ProfileDIDParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const profile = await prisma.profile.findUnique({
    where: { privyDID: params.did },
  })

  res.status(200).send({ externId: profile?.externId || null })
}

export default withAuth(handler)
