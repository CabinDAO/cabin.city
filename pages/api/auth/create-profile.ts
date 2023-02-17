import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { CreateProfile, CreateProfileInput } from '@/fauna/lib/CreateProfile'
import { validateSessionMessage } from '@/lib/next-server/siwe'
import { SiweMessage } from 'siwe'
import { ironOptions } from '@/lib/next-server/iron-options'

export interface CreateProfileBody {
  message: SiweMessage
  signature: string
  name: string
  email: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      // A valid signed message is required to create a profile to ensure the profile is associated with the correct account/address.
      const validatedMessage = await validateSessionMessage({
        req,
        res,
        ...req.body,
      })

      if (!validatedMessage) return

      const body = req.body as CreateProfileBody
      const profile = await _createProfile({
        address: validatedMessage.address,
        name: body.name,
        email: body.email,
      })
      const profileId = profile.ref.id
      res.send({ profileId })
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _createProfile(input: CreateProfileInput): Promise<any> {
  return faunaServerClient.query(CreateProfile(input))
}

export default withIronSessionApiRoute(handler, ironOptions)
