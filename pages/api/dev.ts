import type { NextApiRequest, NextApiResponse } from 'next'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  const profile = await requireProfile(opts.auth)
  if (!profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  res.status(200).send('ok')
}
