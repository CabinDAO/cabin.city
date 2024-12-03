import * as jose from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
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

type AuthData = {
  authToken: string | null
  privyDID: string | null
}

export type OptsWithAuth = { auth: AuthData }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WithAuthApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  opts: OptsWithAuth
) => unknown | Promise<unknown>

export const wrapHandler = (handler: WithAuthApiHandler) => {
  const h = async (req: NextApiRequest, res: NextApiResponse, opts = {}) => {
    try {
      const { authToken, privyDID } = await privyDIDFromHeaders(req.headers)
      Sentry.setUser(privyDID ? { privyDID } : null)
      await handler(req, res, {
        ...opts,
        auth: { authToken, privyDID },
      })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return res.status(error.code).send({ error: error.message })
      } else if (error instanceof PrismaClientValidationError) {
        captureSentryError(error, req)
        console.error(error) // eslint-disable-line no-console
        return res.status(400).send({
          error: `PrismaClientValidationError: ${error.message}`,
        })
      } else {
        captureSentryError(error, req)
        console.error(error) // eslint-disable-line no-console
        return res.status(500).send({ error: 'Something went wrong' })
      }
    }
  }

  return withIronSessionApiRoute(h, ironOptions)
}

const captureSentryError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: PrismaClientValidationError | any,
  req: NextApiRequest
) => {
  Sentry.withScope((scope) => {
    scope.setContext('request', {
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: req.body,
    })
    Sentry.captureException(error)
  })
}

export const requireAuth = (opts: OptsWithAuth): string => {
  if (!opts.auth.authToken) {
    throw new AuthenticationError(401, 'Unauthenticated')
  } else if (!opts.auth.privyDID) {
    throw new AuthenticationError(403, 'Forbidden')
  }

  return opts.auth.privyDID
}

export const getUser = async (
  auth: AuthData
): Promise<ProfileWithWallet | null> => {
  if (!auth.privyDID) {
    return null
  }

  const user = await prisma.profile.findUnique({
    where: { privyDID: auth.privyDID },
    include: {
      wallet: true,
    },
  })

  if (user) {
    Sentry.setUser({ privyDID: user.privyDID })
  }

  return user
}

export const requireUser = async (
  auth: AuthData
): Promise<ProfileWithWallet> => {
  const user = await getUser(auth)

  if (!user) {
    throw new AuthenticationError(403, 'Forbidden')
  }

  return user
}

const privyDIDFromAuthToken = async (authToken: string) => {
  const spkiPublicKey = `-----BEGIN PUBLIC KEY-----
          ${process.env.NEXT_PUBLIC_PRIVY_PUBLIC_KEY}
          -----END PUBLIC KEY-----
          `

  const verificationKey = await jose.importSPKI(spkiPublicKey, 'ES256')

  try {
    const response = await jose.jwtVerify(authToken, verificationKey, {
      issuer: 'privy.io',
      audience: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    })

    return response.payload.sub || null
  } catch (err: unknown) {
    if (err instanceof jose.errors.JWTExpired) {
      // https://github.com/panva/jose/blob/main/docs/util/errors/classes/JWTExpired.md
      return null
    }

    return null
  }
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
