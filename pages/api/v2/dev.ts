import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  const profile = await requireProfile(req, res, opts)
  if (!profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  res.status(200).send('ok')
}
