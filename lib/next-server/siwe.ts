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
    res.status(422).json({ message: 'Invalid nonce.' })
    return null
  }

  req.session.siwe = validatedMessage
  await req.session.save()
  return validatedMessage
}
