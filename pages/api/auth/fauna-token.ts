import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { FaunaTokenResponse } from '@/types/fauna-server'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { ironOptions } from '@/lib/next-server/iron-options'
import withAuth from '@/utils/api/withAuth'

const TOKEN_TTL = 900 // 15 minutes

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FaunaTokenResponse | { message: string }>,
  opts?: { auth?: { externalUserId?: string } }
) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const externalUserId = opts?.auth?.externalUserId

        const resp = (await faunaServerClient.query(
          q.Call(q.Function('create_access_token_by_external_id'), [
            externalUserId,
            TOKEN_TTL,
          ])
        )) as FaunaTokenResponse

        req.session.profile = {
          id: resp.profile.ref.id,
        }

        await req.session.save()

        res.send(resp)
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
