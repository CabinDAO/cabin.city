import * as jose from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { prisma } from '@/lib/prisma'
import { Profile, Wallet } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { IncomingHttpHeaders } from 'http'
import { privy } from '@/lib/privy'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

export type ProfileWithWallet = Profile & {
  wallet: Wallet | null
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
      const { authToken, privyDID } = await privyDIDFromHeaders(req.headers)
      await handler(req, res, {
        ...opts,
        auth: { authToken: authToken, privyDID },
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

export const findProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
): Promise<ProfileWithWallet | null> => {
  if (!opts.auth.privyDID) {
    return null
  }

  return prisma.profile.findUnique({
    where: { privyDID: opts.auth.privyDID },
    include: {
      wallet: true,
    },
  })
}

export const requireProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
): Promise<ProfileWithWallet> => {
  const profile = await findProfile(req, res, opts)

  if (!profile) {
    throw new AuthenticationError(403, 'Forbidden')
  }

  return profile
}

export const privyDIDFromAuthToken = async (authToken: string) => {
  const spkiPublicKey = `-----BEGIN PUBLIC KEY-----
          ${process.env.NEXT_PUBLIC_PRIVY_PUBLIC_KEY}
          -----END PUBLIC KEY-----
          `

  const verificationKey = await jose.importSPKI(spkiPublicKey, 'ES256')

  const response = await jose.jwtVerify(authToken, verificationKey, {
    issuer: 'privy.io',
    audience: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  })

  return response.payload.sub || null
}

export const privyDIDFromHeaders = async (headers: IncomingHttpHeaders) => {
  const authToken = headers.authorization?.replace('Bearer ', '') || null
  const privyDID = authToken ? await privyDIDFromAuthToken(authToken) : null
  return { authToken, privyDID }
}

export const profileFromApiCookies = async (
  cookies: NextApiRequestCookies
): Promise<ProfileWithWallet | null> => {
  const privyToken = cookies['privy-token']
  if (!privyToken) {
    return null
  }

  let privyDID: string | null = null

  try {
    const verifiedClaims = await privy.verifyAuthToken(privyToken)
    privyDID = verifiedClaims.userId
  } catch (error) {
    return null
  }

  if (!privyDID) {
    return null
  }

  return prisma.profile.findUnique({
    where: { privyDID },
    include: {
      wallet: true,
    },
  })
}
