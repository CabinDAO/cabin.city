import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(404).send({ error: 'API route not found' })
}

export default handler
