import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import withAuth from '@/utils/api/withAuth'
import prisma from '@/utils/prisma'
import { Profile, Wallet } from '@prisma/client'

export type ProfileWithWallet = Profile & {
  wallet: Wallet
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProfileApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  opts: { auth: { profile: ProfileWithWallet } }
) => unknown | Promise<unknown>

const withProfile = (handler: ProfileApiHandler) => {
  const h = async (
    req: NextApiRequest,
    res: NextApiResponse,
    opts?: { auth: { externalUserId: string } }
  ) => {
    try {
      const externalUserId = opts?.auth?.externalUserId

      if (!externalUserId) {
        res.status(401).send({ message: 'Unauthorized' })
        return
      }

      const profile = await prisma.profile.findUnique({
        where: { externalUserId: externalUserId },
        include: {
          wallet: true,
        },
      })

      if (!profile) {
        res.status(401).send({ message: 'Unauthorized' })
        return
      }

      return handler(req, res, { ...opts, auth: { profile } })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      res.statusCode = 400
      return res.json({ error: 'Something went wrong' })
    }
  }

  return withIronSessionApiRoute(withAuth(h), ironOptions)
}

export default withProfile
