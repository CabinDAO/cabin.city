import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'

export default withAuth(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  res.status(400).send({ error: 'Disabled' })
  return

  // const profile = await requireProfile(opts.auth)
  //
  // await prisma.profile.update({
  //   where: { id: profile.id },
  //   data: { gotSotn2024Badge: new Date() },
  // })
  //
  // res.status(200).send({ success: true })
}
