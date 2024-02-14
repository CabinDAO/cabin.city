import * as jose from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { prisma } from '@/utils/prisma'
import { Profile, Wallet } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export type ProfileWithWallet = Profile & {
  wallet: Wallet
}

class AuthenticationError extends Error {
  code: 401 | 403
  constructor(code: 401 | 403, message: string) {
    super(message)
    this.name = 'AuthenticationError'
    this.code = code
  }
}

export type AuthData = {
  authToken: string | null
  privyDID: string | null
}

export type WithAuthApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  opts: { auth: AuthData }
) => unknown | Promise<unknown>

// todo: this is a bad name because this also handles prisma errors
export const withAuth = (handler: WithAuthApiHandler) => {
  const h = async (req: NextApiRequest, res: NextApiResponse, opts = {}) => {
    try {
      const authToken =
        (await req.headers.authorization?.replace('Bearer ', '')) || null
      let privyDID: string | null = null

      if (authToken) {
        const spkiPublicKey = `-----BEGIN PUBLIC KEY-----
          ${process.env.NEXT_PUBLIC_PRIVY_PUBLIC_KEY}
          -----END PUBLIC KEY-----
          `

        const verificationKey = await jose.importSPKI(spkiPublicKey, 'ES256')

        const response = await jose.jwtVerify(authToken, verificationKey, {
          issuer: 'privy.io',
          audience: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
        })

        privyDID = response.payload.sub || null
      }

      await handler(req, res, {
        ...opts,
        auth: { authToken: authToken || null, privyDID },
      })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return res.status(error.code).send({ error: error.message })
      } else if (error instanceof PrismaClientValidationError) {
        console.error(error) // eslint-disable-line no-console
        return res.status(400).send({
          error: `PrismaClientValidationError: ${error.message}`,
        })
      } else {
        console.error(error) // eslint-disable-line no-console
        return res.status(400).send({ error: 'Something went wrong' })
      }
    }
  }

  return withIronSessionApiRoute(h, ironOptions)
}

export const requireAuth = (
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
): string => {
  if (!opts.auth.authToken) {
    throw new AuthenticationError(401, 'Unauthenticated')
  } else if (!opts.auth.privyDID) {
    throw new AuthenticationError(403, 'Forbidden')
  }

  return opts.auth.privyDID
}

export const requireProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
): Promise<ProfileWithWallet> => {
  const privyDID = requireAuth(req, res, opts)

  const profile = await prisma.profile.findUnique({
    where: { privyDID },
    include: {
      wallet: true,
    },
  })

  if (!profile) {
    throw new AuthenticationError(403, 'Forbidden')
  }

  return profile
}
