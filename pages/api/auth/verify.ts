import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { validateSessionMessage } from '@/lib/next-server/siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body
        const validatedMessage = await validateSessionMessage({
          req,
          res,
          message,
          signature,
        })

        if (!validatedMessage) return

        res.json({ ok: true })
      } catch (_error) {
        console.error(_error)
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
