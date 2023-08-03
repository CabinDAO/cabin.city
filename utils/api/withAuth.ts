import * as jose from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  opts?: { auth: { externalUserId: string } }
) => unknown | Promise<unknown>

const withAuth = (handler: AuthApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse, opts = {}) => {
    try {
      const authToken = await req.headers.authorization?.replace('Bearer ', '')

      if (!authToken) {
        throw new AuthenticationError('No authorization token provided.')
      }

      const spkiPublicKey = `-----BEGIN PUBLIC KEY-----
      ${process.env.NEXT_PUBLIC_PRIVY_PUBLIC_KEY}
      -----END PUBLIC KEY-----
      `

      const verificationKey = await jose.importSPKI(spkiPublicKey, 'ES256')

      const response = await jose.jwtVerify(authToken, verificationKey, {
        issuer: 'privy.io',
        audience: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      })

      const externalUserId = response.payload.sub

      if (!externalUserId) {
        throw new AuthenticationError('No external user ID provided.')
      }

      // Resume Handler:
      return handler(req, res, { ...opts, auth: { externalUserId } })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      if (error instanceof AuthenticationError) {
        res.statusCode = 401
        return res.json({ error: error.message })
      } else {
        res.statusCode = 400
        return res.json({ error: 'Something went wrong' })
      }
    }
  }
}

export default withAuth
