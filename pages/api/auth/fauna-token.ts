import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { FaunaTokenResponse } from '@/types/fauna-server'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'

const TOKEN_TTL = 900 // 15 minutes

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FaunaTokenResponse | { message: string }>,
  opts: { auth: AuthData }
) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const privyDID = requireAuth(req, res, opts)
        const resp = (await faunaServerClient.query(
          q.Call(q.Function('create_access_token_by_external_id'), [
            privyDID,
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

export default withAuth(handler)
