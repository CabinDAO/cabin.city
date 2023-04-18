import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { FaunaTokenResponse } from '@/types/fauna-server'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { ironOptions } from '@/lib/next-server/iron-options'

const TOKEN_TTL = 900 // 15 minutes

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FaunaTokenResponse | { message: string }>
) => {
  const { method } = req

  switch (method) {
    case 'GET':
      const address = req.session.siwe?.address
      if (!address) {
        res.status(401).send({ message: 'Unauthorized' })
        return
      }

      const resp = (await faunaServerClient.query(
        q.Call(q.Function('create_access_token'), [address, TOKEN_TTL])
      )) as FaunaTokenResponse

      req.session.profile = {
        id: resp.profile.data.id,
      }
      await req.session.save()

      res.send(resp)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
