import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { NextApiRequest, NextApiResponse } from 'next'
import withAuth from '@/utils/api/withAuth'
import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { GetProfileByEmail } from '@/fauna/lib/GetProfileByEmail'
import { setExternalUserId } from '@/lib/fauna-server/setExternalUserId'

export interface ResolveExternalUserBody {
  address: string
  email: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts?: { auth?: { externalUserId?: string } }
) => {
  const { method } = req
  switch (method) {
    case 'POST':
      const { externalUserId } = opts?.auth || {}

      if (!externalUserId) {
        res.status(401).end('Unauthorized')
        return
      }

      try {
        const profileByAddress =
          req.body.address && (await _getProfileByAddress(req.body.address))

        if (profileByAddress) {
          setExternalUserId(profileByAddress.ref.id, externalUserId)
          res.send({ profileId: profileByAddress?.ref?.id })
          return
        }

        const profileByEmail =
          req.body.email && (await _getProfileByEmail(req.body.email))

        if (profileByEmail) {
          setExternalUserId(profileByEmail.ref.id, externalUserId)
          res.send({ profileId: profileByEmail?.ref?.id })
          return
        }

        res.send({ profileId: null })
      } catch (error) {
        console.error(error)
        res.send({ profileId: null })
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getProfileByAddress(address: string): Promise<any> {
  return faunaServerClient.query(GetProfileByAddress(address))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getProfileByEmail(email: string): Promise<any> {
  return faunaServerClient.query(GetProfileByEmail(email))
}

export default withAuth(handler)
