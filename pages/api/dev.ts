import type { NextApiRequest, NextApiResponse } from 'next'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  const user = await requireUser(opts.auth)
  if (!user.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  res.status(200).send('ok')
}
