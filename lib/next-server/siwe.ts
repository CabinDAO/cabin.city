import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

interface VerifySessionParams {
  req: NextApiRequest
  res: NextApiResponse
  message: string
  signature: string
}

export const validateSessionMessage = async (params: VerifySessionParams) => {
  const { req, res, message, signature } = params
  const siweMessage = new SiweMessage(message)
  const validatedMessage = await siweMessage.validate(signature)

  if (validatedMessage.nonce !== req.session.nonce) {
    res.json({ ok: false })
    return null
  }

  /*
  Example of validatedMessage:
    {
      domain: 'localhost:3000',
      address: '0x5685f4d3d59Ef81beEac49f80B785290F9F2ec5c',
      statement: 'Sign in with Ethereum to Cabin Census App.',
      uri: 'http://localhost:3000',
      version: '1',
      nonce: 'x9DNZCqVsuYeN0izU',
      issuedAt: '2023-04-24T18:52:57.180Z',
      expirationTime: undefined,
      notBefore: undefined,
      requestId: undefined,
      chainId: 5,
      resources: undefined
    }
  */
  req.session.siwe = validatedMessage
  await req.session.save()
  return validatedMessage
}
