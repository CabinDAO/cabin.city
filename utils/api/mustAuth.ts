import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import withAuth from '@/utils/api/withAuth'
import { isLocalDev } from '@/utils/dev'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthenticatedApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  opts: { auth: { externalUserId: string } }
) => unknown | Promise<unknown>

const mustAuth = (handler: AuthenticatedApiHandler) => {
  const h = async (
    req: NextApiRequest,
    res: NextApiResponse,
    opts?: { auth: { externalUserId: string } }
  ) => {
    try {
      const spoofedUser = isLocalDev
        ? process.env.DEV_EXTERNAL_USER_ID
        : undefined

      // TODO: withAuth() actually requires authentication so this doesnt do much
      // TODO: split extracting auth info from making auth required? or allow spoofing some other way

      const externalUserId = opts?.auth?.externalUserId ?? spoofedUser

      if (!externalUserId) {
        res.status(401).send({ message: 'Unauthorized' })
        return
      }

      return handler(req, res, { ...opts, auth: { externalUserId } })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      res.statusCode = 400
      return res.json({ error: 'Something went wrong' })
    }
  }

  return withIronSessionApiRoute(withAuth(h), ironOptions)
}

export default mustAuth
