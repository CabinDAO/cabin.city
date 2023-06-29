import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { GetProfileByExternalUserId } from '@/fauna/lib/GetProfileByExternalUserId'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      const profile = await _getProfile(req.query.externalUserId as string)
      res.send({ profileId: profile?.ref?.id })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getProfile(externalUserId: string): Promise<any> {
  return faunaServerClient.query(GetProfileByExternalUserId(externalUserId))
}

export default handler
